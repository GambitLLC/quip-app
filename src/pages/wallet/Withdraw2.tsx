import {StyleSheet, View} from "react-native";
import {
  ButtonClick,
  CryptoNumpadInput,
  flex,
  m,
  p,
  RippleClick,
  Screen,
  Sol,
  spacing,
  Text,
  typography,
  useCrypto,
} from "@/lib";
import {theme} from "@/util/Theme"
import {FontAwesome} from "@expo/vector-icons";
import {useMemo, useState} from "react";
import {Withdraw2Props} from "./Withdraw";

function toFixedAtMost(x: number, digits: number) {
  const e = Math.pow(10, digits);
  return Math.round(x * e) / e;
}

const usdMaxDecimalPlaces = 2
const maxLengthUsd = 9

export function Withdraw2({navigation, route}: Withdraw2Props) {
  const { usdcBalance } = useCrypto()
  const { address } = route.params

  const [input, setInput] = useState('')
  const isValid = useMemo(() => parseFloat(input) > 0 && parseFloat(input) <= (usdcBalance ?? 0), [input])

  function onInput(n: number) {
    //edge case: 0 is pressed when input is 0
    if (input.length === 0 && n === 0) return

    //edge case: input length is at max
    if (input.length >= maxLengthUsd) return

    //edge case: input includes decimal
    if (input.includes('.')) {
      const decimalPlaces = input.split('.')[1].length
      if (decimalPlaces >= usdMaxDecimalPlaces) {
        return
      }
    }

    setInput(input + n.toString())
  }

  function onDecimal() {
    //edge case: input is at max length
    if (input.length >= maxLengthUsd) return

    //edge case: input already includes decimal
    if (input.includes('.')) return

    //edge case: input is empty
    if (input.length === 0) {
      setInput('0.')
      return
    } else {
      setInput(input + '.')
    }
  }

  function onDelete() {
    const newInput = input.slice(0, -1)
    setInput(newInput)
  }

  function clear() {
    setInput('')
  }

  function max() {
    setInput((usdcBalance ?? 0).toString())
  }

  function fontSize() {
    if (input.length > 10) {
      return {
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0,
        fontFamily: 'Co-Headline-700'
      }
    } else if (input.length > 8) {
      return {
        fontSize: 26,
        lineHeight: 26,
        letterSpacing: 0,
        fontFamily: 'Co-Headline-700'
      }
    } else if (input.length > 4) {
      return typography.h5
    } else {
      return typography.h4
    }
  }

  function iconSize() {
    if (input.length > 10) {
      return 18
    } else if (input.length > 8) {
      return 22
    } else if (input.length > 4) {
      return 28
    } else {
      return 32
    }
  }

  function margin() {
    if (input.length > 9) {
      return m('b', 0)
    } else if (input.length > 4) {
      return m('b', 1)
    } else {
      return m('b', 1)
    }
  }

  return (
    <Screen hasSafeArea={false} style={[spacing.fill]}>
      <View style={[spacing.fill, p('a', 4), p('t', 10)]}>
        <View style={[p('a', 6), styles.depositHeader]}>
          <View style={styles.depositHeaderRow}>
            <RippleClick borderless onPress={max} style={styles.depositButton}>
              <Text style={styles.maxText}>MAX</Text>
            </RippleClick>
            <View style={styles.info}>
              <Text style={styles.subtext}>USDC</Text>
              <View style={[flex.row, flex.alignCenter]}>
                <FontAwesome color={theme.colors.s1} size={iconSize()} style={[margin(), m('r', 1)]} name="usd"/>
                <Text style={[fontSize(), p('y', 2)]}>{input.length !== 0 ? input : '0'}</Text>
              </View>
            </View>
            <RippleClick borderless onPress={clear} style={styles.depositButton}>
              <FontAwesome color={theme.colors.p1} size={16} name="times"/>
            </RippleClick>
          </View>
        </View>
        <View style={[flex.col, flex.shrink, m('y', 10)]}>
          <CryptoNumpadInput
            onInput={onInput}
            onDelete={onDelete}
            onDecimal={onDecimal}
          />
        </View>
        <View style={m('b', 8)}>
          <ButtonClick
            disabled={!isValid} onPress={() => {
            navigation.navigate("withdraw3", {
              address: address,
              amountUsdc: parseFloat(input),
            })
          }} mode="contained" style={{width: "100%"}} contentStyle={{height: 56}}>
            <Text style={[typography.button1, {color: theme.colors.white}]}>
              Next
            </Text>
          </ButtonClick>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  depositHeader: {
    backgroundColor: theme.colors.s5,
    borderRadius: 16,
    minHeight: 148
  },

  depositHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100
  },

  depositButton: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
  },

  maxText: {
    fontSize: 14,
    color: theme.colors.p1,
  },

  subtext: {
    fontSize: 14,
    color: theme.colors.s4,
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default Withdraw2;

