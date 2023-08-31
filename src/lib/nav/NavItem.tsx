import {StyleSheet, TouchableWithoutFeedbackProps, View, ViewProps} from "react-native";
import React, {Ref, useEffect, useState} from "react";
import {theme} from "@/util/Theme"
import {IconButton, TouchableRipple} from "react-native-paper";
import {typography} from "../styles/Typography";
import {capitalize} from "../../util/TextUtil";
import Text from "../text/Text";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton)

interface NavItemProps {
  active: boolean,
  icon: string,
  label: string
}

export function NavItem(props: ViewProps & NavItemProps & TouchableWithoutFeedbackProps) {
  const isActive = useSharedValue(props.active)

  useEffect(() => {
    isActive.value = props.active
  }, [props.active])

  const springStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isActive.value ? theme.colors.s2 : theme.colors.s5),
    borderColor: withTiming(isActive.value ? theme.colors.s3 : theme.colors.s5)
  }))

  const colorStyle = useAnimatedStyle(() => ({
    color: withTiming(isActive.value ? theme.colors.primary : theme.colors.s4)
  }))

  const textStyle = useAnimatedStyle(() => ({
    maxWidth: withTiming(isActive.value ? 100 : 0),
    marginRight: withTiming(isActive.value ? 24 : 0),
    opacity: withTiming(isActive.value ? 1 : 0)
  }))

  // const [springProps, api] = useSpring({
  //   backgroundColor: props.active ? theme.colors.s2 : theme.colors.s5,
  //   borderColor: props.active ? theme.colors.s3 : theme.colors.s5,
  //   config: {
  //     duration: animationTime,
  //     friction: 12,
  //     tension: 180,
  //     easing: easings.easeInOutCubic
  //   },
  // }, [props.active])

  // const [colorProps, colorApi] = useSpring({
  //   color: props.active ? theme.colors.primary : theme.colors.s4,
  //   config: {
  //     duration: animationTime,
  //     friction: 12,
  //     tension: 180,
  //     easing: easings.easeInOutCubic
  //   }
  // }, [props.active])

  // const [textProps, textApi] = useSpring({
  //   maxWidth: props.active ? 100 : 0,
  //   marginRight: props.active? 24 : 0,
  //   opacity: props.active ? 1 : 0,
  //   config: {
  //     duration: animationTime,
  //     friction: 12,
  //     tension: 180,
  //     easing: easings.easeOutCubic
  //   }
  // }, [props.active])

  return (
    <TouchableRipple
      borderless
      style={{borderRadius: 9999}}
      {...props as TouchableWithoutFeedbackProps}>
      <Animated.View style={[springStyle, styles.navItem]} key={props.label} {...props}>
        <AnimatedIconButton icon={props.icon} iconColor={props.active ? theme.colors.primary : theme.colors.s4}/>
        <Animated.Text style={[typography.button1, colorStyle, textStyle]}>
          {capitalize(props.label)}
        </Animated.Text>
      </Animated.View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  navItem: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 9999,
    borderStyle: "solid",
    borderWidth: 1,
    position: "relative",
  },
  rippleEffect: {
    position: "absolute",
    backgroundColor: theme.colors.p1,
    borderRadius: 9999,
    opacity: 0.2,
    zIndex: 5
  }
})

export default NavItem;
