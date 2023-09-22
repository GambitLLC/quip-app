import {StyleSheet, View} from 'react-native'
import {
  border,
  ButtonClick,
  flex,
  m,
  p,
  Screen,
  Sol,
  spacing,
  Text,
  typography,
  useCrypto,
  useNotificationStore,
  useTicker,
} from "@/lib";
import {theme} from "@/util/Theme"
import {Withdraw3Props} from "./Withdraw";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {PublicKey} from "@solana/web3.js";
import {CommonActions} from "@react-navigation/native";
import {rootNavRef} from "@/lib/nav/RootNav";

export function Withdraw3({navigation, route}: Withdraw3Props) {
  const { usdPrice } = useTicker()
  const notifications = useNotificationStore()
  const { send } = useCrypto()
  const { address, amountSol } = route.params

  async function sendCrypto() {
    let isValid: boolean
    try {
      const pubKey = new PublicKey(address)
      isValid = PublicKey.isOnCurve(pubKey)
    } catch (e) {
      isValid = false
    }

    if (isValid) {
      rootNavRef.current?.dispatch({
        ...CommonActions.navigate('wallet')
      })

      notifications.add({
        id: performance.now().toString(),
        message: "Sending transaction...",
        type: "info"
      })

      const res = await send(address, amountSol)

      if (res === null) {
        notifications.add({
          id: performance.now().toString(),
          message: "Transaction failed!",
          type: "error"
        })
      } else {
        notifications.add({
          id: performance.now().toString(),
          message: "Transaction sent!",
          type: "success"
        })
      }
    }
  }

  return (
    <Screen hasSafeArea={false} style={[spacing.fill]}>
      <View style={[flex.fillH, flex.fillW, flex.col, flex.alignCenter]}>
        <View style={[border.quip, p('a', 6), m('a', 6), styles.address, flex.row, flex.alignCenter]}>
          <FontAwesome5 name="wallet" size={20} color={theme.colors.p1} style={p('r', 6)}/>
          <Text style={[typography.label2, flex.shrink, {letterSpacing: 0}]}>
            {address}
          </Text>
        </View>
        <View style={flex.grow}/>
        <View style={[flex.row, flex.center, m('b', 2)]}>
          <FontAwesome name="usd" size={40} color={theme.colors.s1} style={{marginBottom: 4, marginRight: 8}}/>
          <Text style={[typography.h3]}>
            {(amountSol * usdPrice).toFixed(2)}
          </Text>
        </View>
        <View style={[flex.row, flex.center, m('b', 28)]}>
          <Sol width={20} height={20} color={theme.colors.s4} style={{marginBottom: 2, marginRight: 4}}/>
          <Text style={[typography.p1, styles.subText]}>
            {amountSol}
          </Text>
        </View>
        <Text style={[{width: 288}, m('b', 14)]}>
          <Text style={[styles.warningTextBold]}>WARNING! </Text>
          <Text style={[styles.warningText]}>
            All withdrawals are final. Please make sure you are sending to the correct address.
          </Text>
        </Text>
        <View style={flex.grow}/>
        <View style={m('b', 12)}>
          <ButtonClick onPress={ sendCrypto } mode="contained" style={[{width: 320}]} contentStyle={{height: 56}}>
            <Text style={[typography.button1, {color: theme.colors.white}]}>
              Send
            </Text>
          </ButtonClick>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  address: {
    borderRadius: 24,
  },
  subText: {
    color: theme.colors.s4,
  },
  warningText: {
    color: theme.colors.s4,
    fontSize: 14,
    textAlign: "center",
  },
  warningTextBold: {
    fontFamily: "Co-Headline-700",
    color: theme.colors.s4,
    fontSize: 14,
    textAlign: "center",
  }
})

export default Withdraw3;
