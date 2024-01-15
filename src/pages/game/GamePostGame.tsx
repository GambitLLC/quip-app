import {View, StyleSheet, Share} from "react-native";
import {GamePostGameProps} from "@/pages/game/GameScreen";
import {
  AvatarPostGame,
  border,
  ConfettiPopper,
  flex,
  m,
  p,
  quips,
  Screen,
  spacing,
  Text,
  typography,
  useGameStore
} from "@/lib";
import theme from "@/util/Theme";
import {Button} from "react-native-paper";
import {FontAwesome5} from "@expo/vector-icons";
import {rootNavRef} from "@/lib/nav/RootNav";
import {CommonActions} from "@react-navigation/native";

function random<T>(arr: T[]) { return arr[Math.floor((Math.random()*arr.length))] }

interface DidWinProps {
  didWin: boolean,
}

interface RewardsProps {
  wager: number,
  exp: number,
}

function RewardsAndLosses(props: DidWinProps & RewardsProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  if (props.didWin) {
    return <>
      <View style={[m('t', 8)]}>
        <Text style={[typography.label2, {color: quip.color}]}>REWARDS</Text>
      </View>
      <View style={[flex.row, flex.alignCenter, m('t', 2)]}>
        <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
          <Text style={[typography.p2]}>
            + {props.wager.toFixed(2)} USDC
          </Text>
        </View>
        <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
          <Text style={[typography.p2]}>
            + {props.exp} EXP
          </Text>
        </View>
      </View>
    </>
  } else {
    return <>
      <View style={[m('t', 8)]}>
        <Text style={[typography.label2, {color: theme.colors.error}]}>LOSSES</Text>
      </View>
      <View style={[flex.row, flex.alignCenter, m('t', 2)]}>
        <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
          <Text style={[typography.p2]}>
            - {props.wager.toFixed(2)} USDC
          </Text>
        </View>
        <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
          <Text style={[typography.p2]}>
            + 0 EXP
          </Text>
        </View>
      </View>
    </>
  }
}

function HeaderText(props: DidWinProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const winText = random([
    "Nice job!",
    "Congratulations!",
    "Great work!",
    "Thats a wrap!",
    "Good game!",
  ])

  const loseText = random([
    "Try again!",
    "Nice try!",
    "Close one!",
    "Good game!",
  ])

  if (props.didWin) {
    return <View style={[flex.col, flex.fillW, flex.center]}>
      <Text style={[typography.label2, {color: quip.color}]}>YOU WON</Text>
      <Text style={[typography.h5]}>{winText}</Text>
    </View>
  } else {
    return <View style={[flex.col, flex.fillW, flex.center]}>
      <Text style={[typography.label2, {color: theme.colors.error}]}>YOU LOST</Text>
      <Text style={[typography.h5]}>{loseText}</Text>
    </View>
  }
}

function PostGameAvatar(props: DidWinProps) {
  if (props.didWin) {
    return <AvatarPostGame size={180} levelText="1ST" percentage={.05}/>
  } else {
    return <AvatarPostGame size={180} levelText="2ND" percentage={.05}/>
  }
}

function PostGamePopper(props: DidWinProps) {
  if (props.didWin) {
    const [WinPopper, winPop] = ConfettiPopper({
      shapes: ['confettiCircle', 'confettiSquiggle'],
      colors: [theme.colors.success]
    })

    winPop(true)

    return <WinPopper/>
  } else {
    const [LosePopper, losePop] = ConfettiPopper({
      shapes: ['confettiX'],
      colors: [theme.colors.error]
    })

    losePop(true)

    return <LosePopper/>
  }
}

export function GamePostGame({route, navigation}: GamePostGameProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const didWin = route.params.didWin
  const rewards = route.params.rewards

  return (
    <Screen style={[spacing.fill, {backgroundColor: quip.bgColor}]}>
      <View style={[flex.col, flex.alignCenter, flex.fillH, p('t', 6)]}>
        <View style={flex.grow}/>
        <HeaderText didWin={didWin}/>
        <View style={flex.grow}/>
        <View style={[m('t', 8), m('b', 4)]}>
          <PostGameAvatar didWin={didWin}/>
        </View>
        <View style={flex.grow}/>
        <RewardsAndLosses didWin={didWin} exp={rewards.exp} wager={rewards.wager}/>
        <View style={flex.grow}/>
        <View style={[m('t', 8), p('b', 8), {backgroundColor: theme.colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40}, flex.col, flex.alignCenter, flex.fillW]}>
          <Button
            theme={{colors: {primary: theme.colors.s1}}}
            onPress={() => {
              rootNavRef.dispatch({...CommonActions.navigate("gameHome"),})
            }}
            style={[{width: 327}, m('y', 4)]}
            contentStyle={{height: 56}}
            mode="outlined"
          >
            <Text style={typography.button1}>
              Back to Home
            </Text>
          </Button>
          <Button
            buttonColor={quip.color as string}
            onPress={() => {
              navigation.push("queue")
            }}
            style={[{width: 327}, m('b', 2)]}
            contentStyle={{height: 56}}
            mode="contained"
          >
            <Text style={[typography.button1, {color: theme.colors.background}]}>
              Play Again
            </Text>
          </Button>
        </View>
      </View>
      <PostGamePopper didWin={didWin}/>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GamePostGame