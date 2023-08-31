import {Alert, Pressable, Share, StyleSheet, View} from "react-native";
import {border, ButtonClick, flex, m, p, RippleClick, Screen, spacing, Text, typography, useCrypto} from "@/lib";

import {theme} from "@/util/Theme"
import {shortAddress} from "@/util/TextUtil"

import QRCodeStyled from 'react-native-qrcode-styled';
import {IconButton} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react"
import Animated, {FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated"

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons)

interface DepositProps {

}

export function Deposit(props: DepositProps) {
  const navigation = useNavigation()
  const { address } = useCrypto()
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const copyToClipboard = async () => {
    if (address === null) return
    await Clipboard.setStringAsync(address);
  };

  if (showCopySuccess) {
    setTimeout(() => {
      setShowCopySuccess(false)
    }, 1000)
  }

  const hover = useSharedValue(1.0)
  const hoverStyle = useAnimatedStyle(() => ({
    opacity: withSpring(hover.value)
  }))

  const onShare = async () => {
    if (address === null) return

    try {
      const result = await Share.share({
        message: address
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Screen style={[spacing.fill]}>
      <View style={[styles.deposit, p('x', 6), p('b', 14)]}>
        <View style={p('x', 4)}>
          <View style={[styles.depositHeader, flex.row, flex.alignCenter, flex.spaceBetween, p('a', 4), m('b', 10)]}>
            <IconButton onPress={() => {
              navigation.goBack()
            }} icon={"arrow-left"}/>
            <Text style={typography.h6}>
              Scan QR Code
            </Text>
            <IconButton icon={""}/>
          </View>
          <View style={[flex.col, flex.alignCenter]}>
            <View style={[m('b', 4)]}>
              <QRCodeStyled
                data={'HJ7MqeXQL1MLfVEh4qZeUzExKg8RUS9Pxiu98oXruG6j'}
                style={{backgroundColor: 'white'}}
                color={theme.colors.p1}
                padding={0}
                pieceBorderRadius={3}
                pieceSize={6}
                pieceScale={.8}
                innerEyesOptions={{
                  borderRadius: 4,
                  color: theme.colors.p1,
                }}
                outerEyesOptions={{
                  borderRadius: 12,
                  color: theme.colors.p1,
                }}
                logo={{
                  href: require("../../../assets/icon.png"),
                  padding: 8,
                  scale: .8,
                }}
                errorCorrectionLevel='H'
              />
            </View>
            <RippleClick
              borderless
              onPress={() => {
                copyToClipboard()
                if (!showCopySuccess) setShowCopySuccess(true)
              }}
              style={[
                border.quip,
                styles.address,
                p('x', 6),
                p('y', 2),
              ]}
            >
              <Text style={styles.addressText}>
                { address === null ? "Missing Address!" : shortAddress(address, 8)}
              </Text>
            </RippleClick>
          </View>
        </View>
        <Text style={{width: 288}}>
          <Text style={[styles.warningTextBold]}>WARNING!</Text>
          <Text style={[styles.warningText]}> Send only Solana (SOL) to this address. Sending any other coin will result in permanent loss.</Text>
        </Text>
        <View>
          <Pressable
            onPressIn={() => {
              hover.value = 0.4
            }}
            onPressOut={() => {
              hover.value = 1.0
            }}
            onPress={() => {
              copyToClipboard()
              if (!showCopySuccess) setShowCopySuccess(true)
            }}

            style={[{height: 56}, m('b', 4), flex.row, flex.center, flex.shrink]}>
            {
              showCopySuccess ?
                <Animated.View entering={FadeIn} exiting={FadeOut} style={[flex.row, flex.center]}>
                  <Text style={[typography.button1, {color: theme.colors.p2}]}>
                    Address copied
                  </Text>
                  <MaterialIcons name="check" size={24} color={theme.colors.p2} style={[m('l', 2), m('b', 1)]}/>
                </Animated.View>
                :
                <Animated.View entering={FadeIn} exiting={FadeOut} style={[flex.row, flex.center]}>
                  <AnimatedIcon name="content-copy" size={24} color={theme.colors.p1} style={[m('r', 2), m('b', 1), hoverStyle]}/>
                  <Animated.Text style={[typography.button1, {color: theme.colors.p1}, hoverStyle]}>
                    Copy to clipboard
                  </Animated.Text>
                </Animated.View>
            }
          </Pressable>
          <ButtonClick onPress={onShare} mode={"contained"} style={{width: 300}} contentStyle={{height: 56}}>
            <Text style={[typography.button1, {color: theme.colors.white}]}>
              Share Address
            </Text>
          </ButtonClick>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  deposit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%"
  },

  depositHeader: {
    backgroundColor: theme.colors.s5,
    borderRadius: 16,
    width: "100%"
  },

  subtext: {
    color: theme.colors.s4,
    fontSize: 14,
  },

  address: {
    borderRadius: 24,
  },

  addressText: {
    color: theme.colors.s4,
    fontSize: 14,
    flexShrink: 1
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
});

export default Deposit;
