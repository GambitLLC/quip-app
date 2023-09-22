import {View, StyleSheet} from "react-native";
import {GameLobbyProps} from "@/pages/game/GameScreen";
import {Screen, spacing, Text} from "@/lib";

export function GameLobby({route, navigation}: GameLobbyProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View>
        <Text>
          Lobby
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GameLobby