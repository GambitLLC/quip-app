import {StyleSheet} from "react-native";
import {flex} from "@/lib";
import React from "react";
import {NavigationContainer, ParamListBase} from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import GameModeSelect from "@/pages/game/GameModeSelect";
import GameQueue from "@/pages/game/GameQueue";
import GameLobby from "@/pages/game/GameLobby";
import Game from "@/pages/game/Game";
import GamePostGame from "@/pages/game/GamePostGame";
import AvatarCreator from "@/pages/settings/AvatarCreator";
import GameLeaderboard from "@/pages/game/GameLeaderboard";

/*
  modeSelect |-> Quick Match  -> Queue              |-> Game Screen -> Post Game
             |-> Custom Match -> Custom Match Lobby |
 */

export type RootStackParamList = {
  modeSelect: undefined,
  queue: undefined,
  lobby: undefined,
  game: undefined,
  postGame: {
    didWin: boolean,
    rewards: {
      wager: number,
      exp: number,
    }
  },
  leaderboard: undefined,
}

export type GameModeSelectProps = NativeStackScreenProps<RootStackParamList, "modeSelect">
export type GameQueueProps = NativeStackScreenProps<RootStackParamList, "queue">
export type GameLobbyProps = NativeStackScreenProps<RootStackParamList, "lobby">
export type GameProps = NativeStackScreenProps<RootStackParamList, "game">
export type GamePostGameProps = NativeStackScreenProps<RootStackParamList, "postGame">
export type GameLeaderboardProps = NativeStackScreenProps<RootStackParamList, "leaderboard">

const Stack = createNativeStackNavigator<RootStackParamList>();


export function GameScreen({navigation}: NativeStackScreenProps<ParamListBase, "gameScreen">) {
  return (
    <Stack.Navigator initialRouteName={"modeSelect"} screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name={"modeSelect"} component={GameModeSelect}/>
        <Stack.Screen name={"queue"} component={GameQueue}/>
        <Stack.Screen name={"lobby"} component={GameLobby}/>
        <Stack.Screen name={"game"} component={Game}/>
        <Stack.Screen name={"postGame"} component={GamePostGame}/>
      </Stack.Group>
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}>
        <Stack.Screen name={"leaderboard"} component={GameLeaderboard}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  gameView: {
    position: "relative",
  },

  gameUi: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "space-between"
  }
})

export default GameScreen;
