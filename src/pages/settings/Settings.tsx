import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Screen, spacing, Text} from "@/lib";
import {ParamListBase} from "@react-navigation/native";

export default function Settings({route, navigation}: NativeStackScreenProps<ParamListBase, "settings">) {
  return (
    <Screen style={[spacing.fill, spacing.center]}>
      <Text>
        Settings!
      </Text>
    </Screen>
  )
}
