import {TouchableRipple} from "react-native-paper";
import React, {forwardRef, Ref} from "react";
import {EasingFunction, View} from "react-native";
import Animated, {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";

interface RippleClickProps extends React.ComponentPropsWithRef<typeof TouchableRipple> {
  duration?: number
  minScale?: number
  easing?: EasingFunction
}

const RippleWrapper = React.forwardRef((props: React.ComponentPropsWithRef<typeof TouchableRipple>, ref: Ref<View>) => {
  return <TouchableRipple ref={ref} {...props}>
    {props.children}
  </TouchableRipple>
})

const AnimatedTouchableRipple = Animated.createAnimatedComponent(RippleWrapper)

export function RippleClick(props: RippleClickProps) {
  const scale = useSharedValue(1.0)
  const minScale = props.minScale ?? .95
  const duration = props.duration ?? 600
  const easing = props.easing ?? Easing.elastic(3.5)

  return (
    <AnimatedTouchableRipple
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
    </AnimatedTouchableRipple>
  );
}

export default RippleClick;
