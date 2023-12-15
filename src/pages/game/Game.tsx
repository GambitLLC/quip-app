import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {ButtonClick, flex, Screen, spacing, Text, typography} from "@/lib";
import theme from "@/util/Theme";
import UnityView from '@azesmway/react-native-unity';

function Unity() {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <UnityView style={{ flex: 1 }}/>
    </View>
  )
}

export function Game({route, navigation}: GameProps) {
  return (
    <Screen style={[spacing.fill]}>
      <Unity/>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default Game