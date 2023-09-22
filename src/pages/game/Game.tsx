import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {Screen, spacing, Text} from "@/lib";

export function Game({route, navigation}: GameProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View>
        <Text>
          Game
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default Game