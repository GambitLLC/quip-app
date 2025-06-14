import {ButtonClick, flex, m, p, PasteItem, Screen, spacing, Text, typography} from "@/lib";
import {theme} from "@/util/Theme"
import {AppState, Keyboard, StyleSheet, TextInput, View} from "react-native";
import {Withdraw1Props} from "./Withdraw";
import {useEffect, useMemo, useRef, useState} from "react";
import {PublicKey} from "@solana/web3.js";
import {FontAwesome} from "@expo/vector-icons";
import {TouchableRipple} from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export function Withdraw1({route, navigation}: Withdraw1Props) {
  const textInputRef = useRef<TextInput>(null)
  const [address, setAddress] = useState(route.params?.address ?? "")
  const [isSelected, setIsSelected] = useState(false)

  const borderColor = useSharedValue(theme.colors.s3)
  const borderBottomWidth = useSharedValue(1)

  const textStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(borderColor.value),
    borderBottomWidth: withTiming(borderBottomWidth.value)
  }))

  useEffect(() => {
    if (!textInputRef.current || !route.params?.address) return
    textInputRef.current.blur()
  }, [textInputRef, route.params?.address])

  useEffect(() => {
    setAddress(route.params?.address ?? "")
  }, [route.params?.address])

  const isValidAddress = useMemo(() => {
    let isValid: boolean
    try {
      const pubKey = new PublicKey(address)
      isValid = PublicKey.isOnCurve(pubKey)
    } catch (e) {
      isValid = false
    }

    return isValid
  }, [address])

  const [clipboardString, setClipboardString] = useState("")

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
      ) {
        getClipboardString()
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  function getClipboardString() {
    Clipboard.getStringAsync().then((res) => {
      try {
        const pubKey = new PublicKey(res)
        if (PublicKey.isOnCurve(pubKey)) {
          setClipboardString(res)
        } else {
          setClipboardString("")
        }
      } catch (e) {
        setClipboardString("")
      }
    })
  }

  useEffect(() => {
    getClipboardString()
  }, [])

  return (
    <Screen hasSafeArea={false} style={[spacing.fill]}>
      <Animated.View style={[flex.fillW, styles.textBorder, flex.row, flex.alignCenter, flex.spaceBetween, textStyle]}>
        <TextInput
          ref={textInputRef}
          onFocus={() => {
            borderBottomWidth.value = 2
            borderColor.value = theme.colors.p1
            setIsSelected(true)
          }}
          onBlur={() => {
            borderBottomWidth.value = 1
            borderColor.value = theme.colors.s3
            setIsSelected(false)
          }}
          onChangeText={setAddress}
          value={address}
          style={[styles.textInput, typography.p2, flex.grow, flex.shrink]}
          placeholder="Solana Address"
          autoComplete={"off"}
          autoCorrect={false}
          autoCapitalize={"none"}
          selectionColor={theme.colors.p1}
          clearButtonMode={"always"}
        />
        <TouchableRipple rippleColor="#AE50FD20" borderless onPress={ address.length === 0 ? () => {
          Keyboard.dismiss()
          navigation.navigate("scanner")
        } : undefined} style={[styles.iconButton, flex.row, flex.center, m('x', 3)]}>
          {
            address.length === 0 ? (
              <FontAwesome size={24} color={theme.colors.p1} name="qrcode"/>
            ) : (
              isValidAddress ? (
                <FontAwesome name={"check-circle"} size={24} color={theme.colors.success}/>
              ) : (
                <FontAwesome name={"exclamation-circle"} size={24} color={theme.colors.error}/>
              )
            )
          }
        </TouchableRipple>
      </Animated.View>
      <View style={[flex.fillH, flex.fillW, flex.col, flex.spaceBetween, flex.shrink, flex.alignCenter, p('b', 12)]}>
        {
          clipboardString.length > 0 ? (
            <PasteItem
              style={[{width: 320}, m('y', 4)]}
              onPress={() => {
                setAddress(clipboardString)
                textInputRef.current?.blur()
              }}
              value={clipboardString}
            />
          ) : (
            <View style={flex.grow}/>
          )
        }
        <ButtonClick
          disabled={!isValidAddress}
          style={[{width: 320}]}
          contentStyle={{height: 56}}
          mode={"contained"}
          onPress={() => {
            navigation.navigate("withdraw2", {
              address,
            })
          }}
        >
          <Text style={[typography.button1, {color: theme.colors.white}]}>Next</Text>
        </ButtonClick>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 56,
    padding: 12,
  },
  textBorder: {
    borderBottomWidth: 1,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  }
})

export default Withdraw1;
