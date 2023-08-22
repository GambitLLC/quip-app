import {typography} from "../styles/Typography"
import {p} from "../styles/Spacing"
import {IconButton} from "react-native-paper";
import {theme} from "@/util/Theme"
import {StyleSheet, View} from "react-native";
import {Text} from "../text/Text"

export function PlayerCountLabel({ numPlayers }: {numPlayers: string}) {
  return (<View style={[styles.numPlayers, p('x', 3), p('l', 2)]}>
    <IconButton style={{
      width: 16,
      height: 16,
    }} iconColor={theme.colors.p1} size={16} icon="account-group"/>
    <Text style={[typography.p4, {color: theme.colors.p1}]}>
      {numPlayers}
    </Text>
  </View>)
}

const styles = StyleSheet.create({
  numPlayers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: 9999,
    height: 32,
  },
})

export default PlayerCountLabel
