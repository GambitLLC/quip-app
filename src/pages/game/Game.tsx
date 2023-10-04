import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {ButtonClick, flex, Screen, spacing, Text, typography} from "@/lib";
import theme from "@/util/Theme";

export function Game({route, navigation}: GameProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View style={[flex.col, flex.fill, flex.center]}>
        <ButtonClick onPress={() => {
          navigation.push("postGame")
        }} mode="contained" style={{width: 300}} contentStyle={{height: 56}}>
          <Text style={[typography.button1, {color: theme.colors.white}]}>To Post Game</Text>
        </ButtonClick>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default Game