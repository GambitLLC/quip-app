import {View, StyleSheet} from "react-native";
import {GameQueueProps} from "@/pages/game/GameScreen";
import {Screen, spacing, Text} from "@/lib";

export function GameQueue({route, navigation}: GameQueueProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View>
        <Text>
          Game Queue
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GameQueue