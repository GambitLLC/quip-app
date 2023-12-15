cd unity/builds/ios
./preBuild.sh
cd ../../..
rm -rf ios/Pods && rm -f ios/Podfile.lock && npx pod-install
