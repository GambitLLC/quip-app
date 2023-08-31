import Animated from 'react-native-reanimated';

import {View} from "react-native";
import {ComponentPropsWithRef, forwardRef, Ref} from "react";
import {TouchableRipple} from "react-native-paper";

const RippleWrapper = forwardRef((props: ComponentPropsWithRef<typeof TouchableRipple>, ref: Ref<View>) => {
  return (
    <View ref={ref}>
      <TouchableRipple {...props}/>
    </View>
  )
})

export const AnimatedRipple = Animated.createAnimatedComponent(RippleWrapper)

export default AnimatedRipple;
