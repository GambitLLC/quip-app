import {ButtonClick, ConfettiPopper, m, p, Screen, spacing, Text} from "@/lib"
import {theme} from "@/util/Theme"
import {View} from "react-native"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";

function Test({navigation}: NativeStackScreenProps<ParamListBase, "test">) {
    const [Popper, pop] = ConfettiPopper()

    return (
      <Screen hasSafeArea={false} screenStyle={[{backgroundColor: theme.colors.background}]} style={[spacing.fill]}>
        <View>
            <ButtonClick onPress={() => pop(true)} style={[p('a', 4), m('a', 8), {zIndex: 5}]}>
                <Text>Pop!</Text>
            </ButtonClick>
        </View>
        <Popper />
      </Screen>
    )
}

export default Test