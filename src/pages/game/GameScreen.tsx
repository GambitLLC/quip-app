import {StyleSheet, View} from "react-native";
import {flex, p, Screen, spacing, Text} from "@/lib";
import React, {useEffect, useState} from "react";
import WebView from "react-native-webview";
import {TouchableRipple} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import { Asset } from "expo-asset";

export function GameScreen() {
  const navigation = useNavigation()

  const [js, setJs] = useState("")

  useEffect(() => {
    (async () => {
      const jsLoader = await fetch(Asset.fromModule(require("../../../assets/games/test/Build/build.loader.gjs")).uri).then(r => r.text())
      const jsFramework = await fetch(Asset.fromModule(require("../../../assets/games/test/Build/build.framework.gjs")).uri).then(r => r.text())

      setJs(`
        ${jsLoader}
        
        ${jsFramework}
      `)
    })()
  }, [])

  console.log(js)

  return (
    <Screen hasSafeArea={true}>
      <View style={[spacing.fill, styles.gameView]}>
        <View style={[{height: 100}, flex.row, flex.fillW]}>
          <Text>
            Test
          </Text>
          <TouchableRipple onPress={() => {
            navigation.goBack()
          }}>
            <Text>
              Back
            </Text>
          </TouchableRipple>
        </View>
        <WebView
          onMessage={(e) => {
            console.log(e.nativeEvent.data)
          }}
          source={require("../../../assets/games/test/index.html")}
          injectedJavaScriptBeforeContentLoaded={js}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gameView: {
    position: "relative",
  },

  gameUi: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "space-between"
  }
})

export default GameScreen;
