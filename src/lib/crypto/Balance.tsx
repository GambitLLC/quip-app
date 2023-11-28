import {StyleSheet, View} from "react-native";
import {Text} from "../text/Text"
import {theme} from "@/util/Theme"
import {m, p} from "../styles/Spacing";
import {typography} from "../styles/Typography";
import {useCrypto} from "../context/CryptoContext";
import {TouchableRipple} from "react-native-paper";
import {useMemo} from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface BalanceProps {
  onPress: () => void
}

export function Balance(props: BalanceProps) {
  const crypto = useCrypto()

  const usdBal = useMemo(() => ((crypto.usdcBalance ?? 0)).toFixed(2), [crypto.usdcBalance])

  return (
    <TouchableRipple borderless onPress={props.onPress} style={[styles.balance]}>
      <View style={[styles.balanceRow, p('a', 2)]}>
        <FontAwesome style={styles.usdIcon} color={theme.colors.s1} size={14} name="usd"/>
        <Text style={[typography.p3, styles.text, m('r', 1)]}>
          {usdBal} USDC
        </Text>
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.s3
  },
  usdIcon: {
    marginBottom: 1,
    marginRight: 4,
    color: theme.colors.s1
  },
  text: {
    color: theme.colors.s1,
  },
  balanceRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Balance
