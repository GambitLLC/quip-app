import {StyleSheet, View} from "react-native";
import {flex, p, Screen, spacing, Text} from "@/lib";
import React from "react";
import WebView from "react-native-webview";
import {TouchableRipple} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export function GameScreen() {
  const navigation = useNavigation()

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
          source={{uri: 'http://192.168.1.111:3000'}}
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
