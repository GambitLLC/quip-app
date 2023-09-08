import Animated from 'react-native-reanimated';
import {View} from "react-native";
import {ComponentPropsWithRef, forwardRef, Ref} from "react";
import {Screen} from "../screen/Screen"

const ScreenWrapper = forwardRef((props: ComponentPropsWithRef<typeof Screen>, ref: Ref<View>) => {
    return (
        <Screen ref={ref} {...props}>
            {props.children}
        </Screen>
    )
})

export const AnimatedScreen = Animated.createAnimatedComponent(ScreenWrapper)

export default AnimatedScreen;
