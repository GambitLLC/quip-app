import {ButtonClick, ConfettiPopper, m, p, Screen, spacing, Text, flex} from "@/lib"
import {theme} from "@/util/Theme"
import {View} from "react-native"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";

function Test({navigation}: NativeStackScreenProps<ParamListBase, "test">) {
    const [LosePopper, losePop] = ConfettiPopper({
        shapes: ['confettiX'],
        colors: [theme.colors.error]
    })

    const [WinPopper, winPop] = ConfettiPopper({
        shapes: ['confettiHeart', 'confettiCircle', 'confettiSquiggle'],
        colors: [theme.colors.success]
    })



    return (
      <Screen hasSafeArea={false} screenStyle={[{backgroundColor: theme.colors.background}]} style={[spacing.fill]}>
        <View style={[spacing.fill]}>
            <View style={flex.grow} />
            <ButtonClick onPress={() => losePop(true)} style={[p('a', 4), m('a', 8), {zIndex: 5}]}>
                <Text>Loser!</Text>
            </ButtonClick>
            <ButtonClick onPress={() => winPop(true)} style={[p('a', 4), m('a', 8), {zIndex: 5}]}>
                <Text>Winner!</Text>
            </ButtonClick>
        </View>
        <LosePopper />
        <WinPopper />
      </Screen>
    )
}

export default Test