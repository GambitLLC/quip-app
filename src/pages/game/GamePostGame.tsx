import {View, StyleSheet, Share} from "react-native";
import {GamePostGameProps} from "@/pages/game/GameScreen";
import {AvatarPostGame, border, flex, m, p, quips, Screen, spacing, Text, typography, useGameStore} from "@/lib";
import theme from "@/util/Theme";
import {Button} from "react-native-paper";
import {FontAwesome5} from "@expo/vector-icons";
import {rootNavRef} from "@/lib/nav/RootNav";
import {CommonActions} from "@react-navigation/native";

export function GamePostGame({route, navigation}: GamePostGameProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const points = 21370

  const onShare = async () => {
    await Share.share({
      message: `Look at my awesome score! I just scored ${points} points on https://quip.gg!`,
    }, {
      dialogTitle: "Share Match Score",
      excludedActivityTypes: [
        //addToReadingList
        "com.apple.UIKit.activity.AddToReadingList",
        //airdrop
        "com.apple.UIKit.activity.AirDrop",
        //assignToContact
        "com.apple.UIKit.activity.AssignToContact",
      ]
    })
  }

  return (
    <Screen style={[spacing.fill, {backgroundColor: quip.bgColor}]}>
      <View style={[flex.col, flex.alignCenter, flex.fillH, p('t', 6)]}>
        <View style={[flex.col, flex.fillW, flex.center]}>
          <Text style={[typography.label2, {color: quip.color}]}>YOU WON</Text>
          <Text style={[typography.h5]}>Congratulations!</Text>
        </View>
        <View style={[m('t', 11), m('b', 4)]}>
          <AvatarPostGame size={112} levelText="1ST" percentage={.05}/>
        </View>
        <Text style={typography.h5}>
          {points} PTS
        </Text>
        <View style={[m('t', 8)]}>
          <Text style={[typography.label2, {color: quip.color}]}>REWARDS</Text>
        </View>
        <View style={[flex.row, flex.alignCenter, m('t', 2)]}>
          <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
            <Text style={[typography.p2]}>
              10.00 USD
            </Text>
            <Text style={[typography.p3, {color: theme.colors.s4}]}>
              ≈ 0.5 SOL
            </Text>
          </View>
          <View style={[border.quip, {borderRadius: 16, backgroundColor: theme.colors.background, height: 72}, flex.col, flex.center, p('x', 6), m('x', 2)]}>
            <Text style={[typography.p2]}>
              2500 EXP
            </Text>
          </View>
        </View>
        <View style={flex.grow}/>
        <View>
          <Button theme={{colors: {primary: theme.colors.s1}}} onPress={() => {
            navigation.push("leaderboard")
          }} mode="outlined" style={{width: 327}} contentStyle={{height: 56}}>
            <Text style={typography.button1}>
              View Leaderboard
            </Text>
          </Button>
        </View>
        <View style={[m('t', 8), p('b', 8), {backgroundColor: theme.colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40}, flex.col, flex.alignCenter, flex.fillW]}>
          <Button
            theme={{colors: {primary: theme.colors.s1}}}
            onPress={onShare}
            style={[{width: 327}, m('y', 2)]}
            contentStyle={{height: 56}} mode="text"
            icon={({size, color}) => <FontAwesome5 name="share-alt" size={size} color={color}/>}
          >
            <Text style={[typography.button1]}>
              Share Your Score
            </Text>
          </Button>
          <Button
            theme={{colors: {primary: theme.colors.s1}}}
            onPress={() => {
              rootNavRef.dispatch({...CommonActions.navigate("gameHome"),})
            }}
            style={[{width: 327}, m('b', 2)]}
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
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GamePostGame