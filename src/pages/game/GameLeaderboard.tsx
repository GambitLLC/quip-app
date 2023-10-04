import {View, StyleSheet, ScrollView} from "react-native";
import {GameLeaderboardProps} from "@/pages/game/GameScreen";
import {border, flex, m, p, PlayfulAvatar, PlayfulAvatarProps, quips, Text, typography, useGameStore} from "@/lib";
import theme from "@/util/Theme";

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

export function GameLeaderboard({navigation}: GameLeaderboardProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  return (
    <ScrollView>
      {
        players.map((player, i) => (
          <>
            <View key={i} style={[flex.row, flex.alignCenter, p('a', 4)]}>
              <View style={{position: "relative"}}>
                <PlayfulAvatar
                  size={player.avatar.size + 14}
                  color={player.avatar.color}
                  eye={player.avatar.eye}
                  face={player.avatar.face}
                  mouth={player.avatar.mouth}
                  outfit={player.avatar.outfit}
                  accessory={player.avatar.accessory}
                  hair={player.avatar.hair}
                />
                <View style={[{position: "absolute"}, flex.fill]}>
                  <View style={[{position: "absolute", borderRadius: 9999, backgroundColor: quip.color, bottom: -2, right: -2, width: 18, height: 18}]}>
                    <View style={[flex.row, flex.fill, flex.center]}>
                      <Text style={[{color: theme.colors.background}, typography.p3]}>
                        {i+1}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[m('l', 4)]}>
                <Text style={[typography.p2]}>
                  {player.name}
                </Text>
                <Text style={[typography.p3, {color: theme.colors.s4}]}>
                  LVL {player.level}
                </Text>
              </View>
              <View style={flex.grow}/>
              <View>
                <Text style={[typography.p2, {textAlign: "right"}]}>
                  Score
                </Text>
                <Text style={[typography.p3, {textAlign: "right", color: theme.colors.s4}]}>
                  Earning
                </Text>
              </View>
            </View>
            {i < (players.length-1) && <View style={[styles.divider]}/>}
          </>
        ))
      }
    </ScrollView>
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

export default GameLeaderboard