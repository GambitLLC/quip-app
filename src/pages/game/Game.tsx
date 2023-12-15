import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {ButtonClick, flex, Screen, spacing, Text, typography} from "@/lib";
import theme from "@/util/Theme";
import UnityView from '@azesmway/react-native-unity';

function Unity({route, navigation}: GameProps) {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <UnityView onUnityMessage={(event) => {
        console.log(`UnityMessage: ${event.nativeEvent.message}`)
        const message = event.nativeEvent.message

        if (message === "postGame") {
          navigation.push("postGame")
        }
      }} style={{ flex: 1 }}/>
    </View>
  )
}

export function Game({route, navigation}: GameProps) {
  return (
    <Screen hasStatusBar={false} hasSafeArea={false} style={[spacing.fill]}>
      <Unity route={route} navigation={navigation}/>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default Game