#if UNITY_EDITOR
using UnityEditor;

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
}
#endif