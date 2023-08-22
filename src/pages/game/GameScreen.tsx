import {StyleSheet, View} from "react-native";
import {p, Screen, spacing} from "@/lib";
import React from "react";

export function GameScreen() {

  return (
    <Screen hasSafeArea={false}>
      <View style={[spacing.fill, styles.gameView]}>
        <View style={[styles.gameUi, p('b', 12), p('t', 20), p('x', 8)]}>
        </View>
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
