import {Button} from "react-native-paper";
import React, {Ref} from "react";
import Animated, {Easing, useSharedValue, withTiming} from 'react-native-reanimated';
import {EasingFunction, View} from "react-native";

interface ButtonClickProps extends React.ComponentPropsWithRef<typeof Button> {
  duration?: number
  minScale?: number
  easing?: EasingFunction
}

const ButtonWrapper = React.forwardRef((props: React.ComponentPropsWithRef<typeof Button>, ref: Ref<View>) => {
  return <Button ref={ref} {...props}>
    {props.children}
  </Button>
})

const AnimatedButton = Animated.createAnimatedComponent(ButtonWrapper)

export function ButtonClick(props: ButtonClickProps) {
  const scale = useSharedValue(1.0)
  const minScale = props.minScale ?? .95
  const duration = props.duration ?? 600
  const easing = props.easing ?? Easing.elastic(3.5)

  return (
    <AnimatedButton
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
    </AnimatedButton>
  );
}

export default ButtonClick;
