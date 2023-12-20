#if UNITY_EDITOR
using System;
using System.Diagnostics;
using System.IO;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;
using Debug = UnityEngine.Debug;

public static class AutoBuild
{
    [MenuItem("Build/Build iOS Project %#i")]
    public static void BuildProject()
    {
        var options = new BuildPlayerOptions
        {
            scenes = new[] {"Assets/Scenes/SampleScene.unity"},
            target = BuildTarget.iOS, 
            locationPathName = "./builds/",
        };

        BuildPipeline.BuildPlayer(options);
    }

    private static void BuildFastlane()
    {
        // Set up process start info
        ProcessStartInfo psi = new ProcessStartInfo()
        {
            FileName = "/bin/bash",
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        // Start the process
        Process process = new Process() { StartInfo = psi };
        process.Start();
        
        // Read the output stream asynchronously
        process.OutputDataReceived += (sender, e) =>
        {
            if (e.Data != null)
            {
                Debug.Log(e.Data);
            }
        };

        process.BeginOutputReadLine();

        // Read the error stream asynchronously
        process.ErrorDataReceived += (sender, e) =>
        {
            if (e.Data != null)
            {
                Debug.LogError(e.Data);
            }
        };

        process.BeginErrorReadLine();

        // Execute the Bash command
        StreamWriter sw = process.StandardInput;
        sw.WriteLine("/usr/local/bin/fastlane build");
        sw.Close();

        // Wait for the process to exit
        process.WaitForExit();

        // Close the process
        process.Close();
    }
    
    [PostProcessBuild(1)]
    public static void OnPostprocessBuild(BuildTarget target, string pathToBuiltProject) {
        // Auto Build only supports iOS at the moment
        if (target != BuildTarget.iOS) return;

        var pathToXcodeProject = PBXProject.GetPBXProjectPath(pathToBuiltProject);
        
        // get an instance to the xcode project
        var pbxProject = new PBXProject();
        pbxProject.ReadFromFile(pathToXcodeProject);
        
        // -- POST PROCESS XC PROJECT HERE --
        var targetName = "UnityFramework";
        var targetGuid = pbxProject.TargetGuidByName(targetName);
        
        // If target is not found, log an error and exit
        if (string.IsNullOrEmpty(targetGuid))
        {
            Debug.LogError("Target " + targetName + " not found!");
            return;
        }
        
        //get the guid of the data folder
        var dataPath = "Data";
        var dataGuid = pbxProject.FindFileGuidByProjectPath(dataPath);
        
        // If data folder is not found, log an error and exit
        if (string.IsNullOrEmpty(dataGuid))
        {
            Debug.LogError("Data folder not found!");
            return;
        }
        
        // Add the data folder to the UnityFramework target
        pbxProject.AddFileToBuild(targetGuid, dataGuid);
        
        //get the guid of the NativeCallProxy.h file
        var nativeCallProxyPath = "Libraries/Plugins/iOS/NativeCallProxy.h";
        var nativeCallProxyGuid = pbxProject.FindFileGuidByProjectPath(nativeCallProxyPath);
        
        //set the visibility of the NativeCallProxy.h file to public
        pbxProject.AddPublicHeaderToBuild(targetGuid, nativeCallProxyGuid);

        // Turn on "Automatically manage signing" for the "UnityFramework" target
        pbxProject.SetBuildProperty(targetGuid, "CODE_SIGN_STYLE", "Automatic");
        
        // Set the development team
        pbxProject.SetBuildProperty(targetGuid, "DEVELOPMENT_TEAM", "DPJ8NDYLC9");
        
        // Save the changes to the Xcode project file
        pbxProject.WriteToFile(pathToXcodeProject);
        
        Debug.Log("PostProcessBuild - iOS - Finished");
        
        // call fastlane to build the project framework
        BuildFastlane();
    }
}
#endif