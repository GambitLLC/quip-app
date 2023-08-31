import {TouchableRipple} from "react-native-paper";
import React from "react";
import {EasingFunction} from "react-native";
import {Easing, useSharedValue, withTiming} from "react-native-reanimated";
import {AnimatedRipple} from "../animations/AnimatedRipple";

interface RippleClickProps extends React.ComponentPropsWithRef<typeof TouchableRipple> {
  duration?: number
  minScale?: number
  easing?: EasingFunction
}

export function RippleClick(props: RippleClickProps) {
  const scale = useSharedValue(1.0)
  const minScale = props.minScale ?? .95
  const duration = props.duration ?? 600
  const easing = props.easing ?? Easing.elastic(3.5)

  return (
    <AnimatedRipple
      {...props}
      style={[props.style, {
        transform: [
          {scale: scale}
        ]
      }]}
      onPressIn={(e) => {
        scale.value = withTiming(minScale, {duration, easing})
        props.onPressIn?.(e)
      }}
      onPressOut={(e) => {
        scale.value = withTiming(1.0, {duration, easing})
        props.onPressOut?.(e)
      }}
    >
      {props.children}
    </AnimatedRipple>
  );
}

export default RippleClick;
