import Animated from 'react-native-reanimated';

import {View} from "react-native";
import {ComponentPropsWithRef, forwardRef, Ref} from "react";
import {Button} from "react-native-paper";

const ButtonWrapper = forwardRef((props: ComponentPropsWithRef<typeof Button>, ref: Ref<View>) => {
  return (
    <View ref={ref}>
      <Button {...props}/>
    </View>
  )
})

export const AnimatedButton = Animated.createAnimatedComponent(ButtonWrapper)

export default AnimatedButton;
