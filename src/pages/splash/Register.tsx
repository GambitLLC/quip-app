import {Screen, spacing} from "@/lib";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";
import {ParamListBase} from "@react-navigation/native";

export default function Register({navigation}: NativeStackScreenProps<ParamListBase, "register">) {
  return (
    <Screen style={[spacing.fill, spacing.center]}>
      <View style={styles.getStarted}>

      </View>
      <View>

      </View>
      <View>

      </View>
      <View style={styles.bottomBar}>

      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  getStarted: {

  },

  bottomBar: {

  }
})
