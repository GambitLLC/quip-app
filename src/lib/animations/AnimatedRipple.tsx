import Animated, {
  Easing,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import {View, Pressable} from "react-native";
import {ComponentPropsWithRef, forwardRef} from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type RippleWrapperProps = ComponentPropsWithRef<typeof Pressable> & {
  duration?: number
}

const RippleWrapper = forwardRef<View, RippleWrapperProps>((props, ref) => {
  const isPressed = useSharedValue(false)

  const duration = props.duration ?? 600

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isPressed.value ? .5 : 1, {
      duration: duration / 2,
      easing: Easing.inOut(Easing.linear)
    })
  }))

  return (
    <AnimatedPressable
      {...props}
      style={[props.style as StyleProps, animatedStyle]}
      onPressIn={(e) => { isPressed.value = true; props.onPressIn?.(e) }}
      onPressOut={(e) => { isPressed.value = false; props.onPressOut?.(e) }}
      ref={ref}
    >
      {props.children}
    </AnimatedPressable>
  )
})

export const AnimatedRipple = Animated.createAnimatedComponent(RippleWrapper)

export default AnimatedRipple;
