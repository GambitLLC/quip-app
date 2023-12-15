import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {ButtonClick, flex, Screen, spacing, Text, typography} from "@/lib";
import theme from "@/util/Theme";
import UnityView from '@azesmway/react-native-unity';
import {useRef} from "react";

function Unity({route, navigation}: GameProps) {
  const unityRef = useRef<UnityView | null>(null)

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <UnityView ref={unityRef} onUnityMessage={(event) => {
        if (unityRef.current === null) return

        console.log(`UnityMessage: ${event.nativeEvent.message}`)
        const message = event.nativeEvent.message

        if (message.includes("postGame")) {
          unityRef.current?.unloadUnity()
          navigation.navigate("postGame", {
            winner: (message.split(" ")[1]) as "1" | "2"
          })
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