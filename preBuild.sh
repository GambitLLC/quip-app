cd unity/builds/ios

folder_name="Release-iphoneos"

if [ -d "$folder_name" ]; then
    echo "The folder $folder_name exists."
    rm -rf UnityFramework.framework
    echo "Removing old framework"
    cd Release-iphoneos
    mv UnityFramework.framework ../
    echo "Moving new framework"
    cd ../
    rm -rf Release-iphoneos
    echo "Removing Release-iphoneos folder"
else
    echo "The folder $folder_name does not exist."
    echo "Skipping preBuild process"
fi

cd ../../..
