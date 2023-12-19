# import the gem
require 'xcodeproj'
require 'fastlane'

# open the project
project_path = './unity/builds/Unity-iPhone.xcodeproj'
project = Xcodeproj::Project.open(project_path)

target_name = 'UnityFramework'

target = project.targets.find { |t| t.name == target_name }

# if target is not found, error and exit
if target.nil?
    puts "Target #{target_name} not found."
    exit
end

# get the "Data" folder path
data_group = project.main_group.find_subpath('Data', true)

# add the "Data" folder to the "UnityFramework" target
data_group.set_source_tree('SOURCE_ROOT')
data_group.set_path('Data')
target.add_file_references([data_group])

# get the "NativeCallProxy.h" file path located in "Libraries/Plugins/iOS"
native_call_proxy_file = project.main_group.find_subpath('Libraries/Plugins/iOS/NativeCallProxy.h', true)

# add the "NativeCallProxy.h" file to the "UnityFramework" target and set the "Public" visibility
native_call_proxy_file.set_source_tree('SOURCE_ROOT')
native_call_proxy_file.set_path('Libraries/Plugins/iOS/NativeCallProxy.h')
target.add_file_references([native_call_proxy_file])

# get the underlying PBXBuildFile for the "NativeCallProxy.h" file
native_call_proxy_build_file = native_call_proxy_file.build_files.first

# set the "Public" visibility
native_call_proxy_build_file.settings = { 'ATTRIBUTES' => ['Public'] }

# turn on "Automatically manage signing" for the "UnityFramework" target
target.build_configurations.each do |config|
    config.build_settings['CODE_SIGN_STYLE'] = 'Automatic'

    # get available Team IDs
    # xcodebuild -showBuildSettings -project Unity-iPhone.xcodeproj -target UnityFramework | grep DEVELOPMENT_TEAM

    # set the "Development Team" to your team id
    config.build_settings['DEVELOPMENT_TEAM'] = 'DPJ8NDYLC9'
end

# save the project
project.save
