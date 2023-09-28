import {View, StyleSheet, ScrollView, Share, Alert} from "react-native";
import {GameLobbyProps} from "@/pages/game/GameScreen";
import {
  border,
  flex,
  m,
  p,
  PlayfulAvatar,
  PlayfulAvatarProps,
  quips,
  Screen,
  spacing,
  Text,
  typography,
  useGameStore
} from "@/lib";
import {capitalize} from "@/util/TextUtil";
import theme from "@/util/Theme";
import {useMemo, useState} from "react";
import {Button} from "react-native-paper";

interface Player {
  name: string,
  avatar: PlayfulAvatarProps,
  isLeader: boolean,
  level: number,
}

const players: Player[] = [
  {
    name: "Player 1",
    avatar: {
      size: 40,
      color: "#C2F1C3",
      accessory: "Earphone",
      eye: "Normal",
      face: "Light",
      hair: "Hair03",
      mouth: "Angry",
      outfit: "Outfit01",
    },
    isLeader: true,
    level: 1,
  },
  {
    name: "Player 1",
    avatar: {
      size: 40,
      color: "#C2F1C3",
      accessory: "Earphone",
      eye: "Normal",
      face: "Light",
      hair: "Hair03",
      mouth: "Angry",
      outfit: "Outfit01",
    },
    isLeader: true,
    level: 1,
  },
  {
    name: "Player 1",
    avatar: {
      size: 40,
      color: "#C2F1C3",
      accessory: "Earphone",
      eye: "Normal",
      face: "Light",
      hair: "Hair03",
      mouth: "Angry",
      outfit: "Outfit01",
    },
    isLeader: true,
    level: 1,
  },
  {
    name: "Player 1",
    avatar: {
      size: 40,
      color: "#C2F1C3",
      accessory: "Earphone",
      eye: "Normal",
      face: "Light",
      hair: "Hair03",
      mouth: "Angry",
      outfit: "Outfit01",
    },
    isLeader: true,
    level: 1,
  },
  {
    name: "Player 1",
    avatar: {
      size: 40,
      color: "#C2F1C3",
      accessory: "Earphone",
      eye: "Normal",
      face: "Light",
      hair: "Hair03",
      mouth: "Angry",
      outfit: "Outfit01",
    },
    isLeader: true,
    level: 1,
  },
]

export function GameLobby({route, navigation}: GameLobbyProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const wagerUsd = 10.00
  const wagerSol = wagerUsd / 20
  const totalPool = players.length * wagerUsd

  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [largestY, setLargestY] = useState(0)

  const scrollEnabled = useMemo(() => {
    return largestY > scrollViewHeight
  }, [scrollViewHeight, largestY])

  const onShare = async () => {
    await Share.share({
      message: "Join my match lobby on Quip! https://quip.gg/lobby/1234567890",

    }, {
      dialogTitle: "Share Match Lobby",
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
      <View style={[flex.fill, p('t', 6), p('b', 14), p('x', 6)]}>
        <View style={[flex.col, flex.alignCenter]}>
          <Text style={[typography.label2, {color: quip.color}]}>QUIP {quip.name.toUpperCase()} - MATCH LOBBY</Text>
          <Text style={[typography.h5]}>Waiting For Players</Text>
        </View>
        <View style={[m('t', 4)]}>
          <Text style={[typography.label2, {color: quip.color}, p('y', 2)]}>
            MATCH DETAILS
          </Text>
          <View style={[border.quip, {borderRadius: 24}, {backgroundColor: theme.colors.background}]}>
            <View style={[p('a', 4), flex.row, flex.spaceBetween]}>
              <View>
                <Text style={[{textAlign: "left"}, typography.p2]}>
                  Total Pool
                </Text>
                <Text style={[{textAlign: "left", color: theme.colors.s4}, typography.p3]}>
                  SOL
                </Text>
              </View>
              <View>
                <Text style={[{textAlign: "right"}, typography.p2]}>
                  40.00 USD
                </Text>
                <Text style={[{textAlign: "right", color: theme.colors.s4}, typography.p3]}>
                  2.00 SOL
                </Text>
              </View>
            </View>
            <View style={[styles.divider]}/>
            <View style={[p('a', 4), flex.row, flex.spaceBetween]}>
              <View>
                <Text style={[{textAlign: "left"}, typography.p2]}>
                  Wager
                </Text>
                <Text style={[{textAlign: "left", color: theme.colors.s4}, typography.p3]}>
                  SOL
                </Text>
              </View>
              <View>
                <Text style={[{textAlign: "right"}, typography.p2]}>
                  10.00 USD
                </Text>
                <Text style={[{textAlign: "right", color: theme.colors.s4}, typography.p3]}>
                  0.5 SOL
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[m('t', 4)]}>
          <Text style={[typography.label2, {color: quip.color}, p('y', 2)]}>
            PLAYER LIST
          </Text>
        </View>
        <ScrollView scrollEnabled={scrollEnabled} onLayout={(e) => {
          setScrollViewHeight(e.nativeEvent.layout.height)
        }} showsVerticalScrollIndicator={false} style={[border.quip, {borderRadius: 24}, {backgroundColor: theme.colors.background}]}>
          {
            players.map((player, i) =>
              <View key={i} onLayout={(e) => {
                const {y, height} = e.nativeEvent.layout
                setLargestY((ly) => {
                  if (y + height > ly) {
                    return y + height
                  } else {
                    return ly
                  }
                })
              }}>
                <View key={i} style={[flex.row, p('a', 4)]}>
                  <PlayfulAvatar
                    size={player.avatar.size}
                    color={player.avatar.color}
                    eye={player.avatar.eye}
                    face={player.avatar.face}
                    mouth={player.avatar.mouth}
                    outfit={player.avatar.outfit}
                    accessory={player.avatar.accessory}
                    hair={player.avatar.hair}
                  />
                  <View style={[m('l', 4)]}>
                    <Text style={[typography.p2]}>
                      {player.name}
                    </Text>
                    <Text style={[typography.p3, {color: theme.colors.s4}]}>
                      LVL {player.level}
                    </Text>
                  </View>
                  <View style={[flex.grow]}/>
                  <View style={[m('l', 4)]}>
                    <Text style={[typography.p2, {textAlign: "right"}]}>
                      {wagerUsd.toFixed(2)} USD
                    </Text>
                    <Text style={[typography.p3, {color: theme.colors.s4, textAlign: "right"}]}>
                      {wagerSol} SOL
                    </Text>
                  </View>
                </View>
                {i < (players.length-1) && <View style={[styles.divider]}/>}
              </View>
            )
          }
        </ScrollView>
        <View style={flex.grow}/>
        <Button theme={{
          colors: {
            primary: theme.colors.s1,
          }
        }} onPress={onShare} style={[m('b', 5), m('t', 5)]} contentStyle={{height: 56}} mode={"outlined"}>
          <Text style={[typography.button1]}>
            Share Link
          </Text>
        </Button>
        <Button onPress={() => {
          navigation.navigate("game")
        }} contentStyle={{height: 56}} buttonColor={quip.color as string}>
          <Text style={[{color: theme.colors.white}, typography.button1]}>
            Start Match
          </Text>
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  divider: {
    borderStyle: "solid",
    borderColor: theme.colors.s3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
  },
})

export default GameLobby