# Generate the XCode project from Unity
# (genUnityXCode.sh)
cd unity
/Applications/Unity/Hub/Editor/2023.1.0b6/Unity.app/Contents/MacOS/Unity -quit -batchmode -logfile - -executeMethod AutoBuild.BuildProject
cd ..

# Setup the XCode project to have the correct settings
ruby ./setupXCode.rb

# Build the UnityFramework from the generated Project
# (buildXCode.sh)
xcodebuild -project ./unity/builds/Unity-iPhone.xcodeproj -target UnityFramework -configuration Release -sdk iphoneos clean build CONFIGURATION_BUILD_DIR=./ios

# Build the react-native expo project
rm -rf ios/Pods && rm -f ios/Podfile.lock && npx pod-install


