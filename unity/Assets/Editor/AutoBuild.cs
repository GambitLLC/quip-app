using UnityEditor;

public static class AutoBuild
{
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