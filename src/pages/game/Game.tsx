import {View, StyleSheet} from "react-native";
import {GameProps} from "@/pages/game/GameScreen";
import {ButtonClick, flex, Screen, spacing, Text, typography} from "@/lib";
import theme from "@/util/Theme";
import UnityView from '@azesmway/react-native-unity';
import {forwardRef, useRef, useState} from "react";

enum MessageType {
  GameStart = "gameStart",
  GameEnd = "gameEnd",
}

type TwoPlayerId = "1" | "2"

interface GameMessage {
  type: MessageType,
}

interface GameStartMessage extends GameMessage {
  type: MessageType.GameStart,
  player: TwoPlayerId,
  enemy: TwoPlayerId,
}

interface GameEndMessage extends GameMessage {
  type: MessageType.GameEnd,
  winner: TwoPlayerId,
}

type UnityMessage = GameStartMessage | GameEndMessage;

const Unity = forwardRef<UnityView, GameEvents>((props, ref) => {
  return <UnityView 
    ref={ref}
    onUnityMessage={(event) => {
      if (ref.current === null) return

      const message = JSON.parse(event.nativeEvent.message) as UnityMessage

      console.log(message)
      console.log(`type: ${message.type}`)

      const cb = props.on[message.type]
      if (cb === undefined) return

      console.log(cb)

      // @ts-ignore
      cb(message)
    }}
    style={{ flex: 1 }}
  />
})

interface GameEvents {
  on: {
    gameStart: (event: GameStartMessage) => void,
    gameEnd: (event: GameEndMessage) => void,
  }
}

export function Game({route, navigation}: GameProps) {
  const [playerId, setPlayerId] = useState<TwoPlayerId | null>(null)
  const unityRef = useRef<UnityView>(null)

  return (
    <Screen hasStatusBar={false} hasSafeArea={false} style={[spacing.fill]}>
      <Unity 
        ref={unityRef}
        on={{
          gameStart: ({player, enemy}) => {
            console.log(`Game start: ${player} vs ${enemy}`)
            setPlayerId(player)
          },
          gameEnd: ({winner}) => {
            console.log(`Game end: ${winner} won`)
            unityRef.current?.unloadUnity()
            navigation.navigate("postGame", 
            {
              didWin: winner === playerId,
              rewards: {
                wager: 1,
                exp: 100,
              }
            }
            )
          }
        }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default Game