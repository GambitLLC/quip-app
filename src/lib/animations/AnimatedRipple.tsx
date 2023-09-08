import Animated from 'react-native-reanimated';
import { LogBox } from 'react-native';

import {View} from "react-native";
import {ComponentPropsWithRef, forwardRef, Ref} from "react";
import {TouchableRipple} from "react-native-paper";

LogBox.ignoreLogs([
  "Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?",
])

const RippleWrapper = forwardRef((props: ComponentPropsWithRef<typeof TouchableRipple>, ref: Ref<View>) => {
  return (
    <TouchableRipple ref={ref} {...props}>
      {props.children}
    </TouchableRipple>
  )
})

export const AnimatedRipple = Animated.createAnimatedComponent(RippleWrapper)

export default AnimatedRipple;
