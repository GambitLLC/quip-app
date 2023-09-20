import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import {NavigationContainer, ParamListBase} from "@react-navigation/native";
import React from "react";
import AvatarCreator from "@/pages/settings/AvatarCreator";
import SettingsScreen from "@/pages/settings/SettingsScreen";

export type RootStackParamList = {
  settings: undefined,
  avatarCreator: undefined,
}

export type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">
export type AvatarCreatorProps = NativeStackScreenProps<RootStackParamList, "avatarCreator">

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Settings({route, navigation}: NativeStackScreenProps<ParamListBase, "settings">) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"settings"} screenOptions={{headerShown: false}}>
        <Stack.Group screenOptions={{
          presentation: 'modal',
        }}>
          <Stack.Screen name={"avatarCreator"} component={AvatarCreator}/>
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name={"settings"} component={SettingsScreen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
