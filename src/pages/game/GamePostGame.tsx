import {View, StyleSheet} from "react-native";
import {GamePostGameProps} from "@/pages/game/GameScreen";
import {Screen, spacing, Text} from "@/lib";

export function GamePostGame({route, navigation}: GamePostGameProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View>
        <Text>
          Post Game
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GamePostGame