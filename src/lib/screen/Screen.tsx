import {StatusBar} from "expo-status-bar";
import {ColorValue, StyleProp, View, ViewStyle} from "react-native";
import {p, spacing} from "../styles/Spacing";
import {theme} from "@/util/Theme"
import React, {forwardRef, Ref} from "react";
import {Text} from "../text/Text"

interface ScreenProps {
  children: React.ReactNode,
  style?: StyleProp<ViewStyle>,
  screenStyle?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  pointerEvents?: "box-none" | "none" | "box-only" | "auto",
  hasSafeArea?: boolean,
  hasStatusBar?: boolean,
  backgroundColor?: ColorValue
}

export const Screen = forwardRef((props: ScreenProps, ref: Ref<View>) => {
  const hasSafeArea = props.hasSafeArea ?? true
  const hasStatusBar = props.hasStatusBar ?? true
  const backgroundColor = props.backgroundColor ?? theme.colors.background

  return (
    <View
      ref={ref}
      pointerEvents={props.pointerEvents}
      style={[
        spacing.fill,
        props.containerStyle,
        {position: "relative", backgroundColor}
      ]}
    >
      <StatusBar hidden={!hasStatusBar} style="dark"/>
      <View
        pointerEvents={props.pointerEvents}
        style={[
          props.style ?? spacing.fill,
          props.screenStyle,
          hasSafeArea ? p('t', 12) : p('t', 0)
        ]}
      >
        {props.children}
      </View>
    </View>
  )
})

export default Screen;
