import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {
  AvatarXp,
  Balance,
  ButtonClick,
  createQuipNavigator,
  flex,
  LogoText,
  m,
  p,
  quips,
  Screen,
  Slider,
  spacing,
  Text,
  typography,
  useNotificationStore
} from "@/lib";
import {theme} from "@/util/Theme";
import {capitalize} from "@/util/TextUtil";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {CommonActions, ParamListBase} from "@react-navigation/native";
import Wallet from "../wallet/Wallet";
import Settings from "../settings/Settings";
import Animated, {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import React, {useMemo} from "react";
import Info from "@/pages/game/Info";
import Profile from "@/pages/profile/Profile";

const Quip = createQuipNavigator();

function GameHome({navigation}: NativeStackScreenProps<ParamListBase, "games">) {
  const {add} = useNotificationStore()

  const {width} = useWindowDimensions()
  const cardWidth = 250
  const gap = 12
  const offset = useMemo(() => (width - 274) / 2, [width])
  const snapOffsets = [
    0,
    offset + gap + cardWidth + gap - offset,
    offset + gap + cardWidth + gap + cardWidth + gap + gap - offset
  ]

  const scrollX = useSharedValue(snapOffsets[1])

  function onScroll(x: number) {
    'worklet'
    scrollX.value = x
  }

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(scrollX.value, [0, 274, 548], [0, -width, -width * 2])},
    ]
  }))

  return (<Screen screenStyle={[{backgroundColor: theme.colors.background}]} style={[spacing.fill]}>
    <View style={[styles.homeContainer]}>
      {/*Topbar*/}
      <View style={[p('x', 6), m('b', 8)]}>
        {/*Player Topbar*/}
        <View style={[styles.playerBar, m('b', 4)]}>
          <Balance onPress={() => {
            navigation.dispatch({
              ...CommonActions.navigate('wallet')
            })
          }}/>
          <AvatarXp onPress={() => {
            navigation.dispatch({
              ...CommonActions.navigate('profile')
            })
          }} level={5} percentage={.05} source={require('../../../assets/AvatarTest.png')}/>
        </View>
        {/*Select Quip*/}
        <Text style={[typography.h5, {color: theme.colors.s1}]}>
          Select Quip
        </Text>
      </View>
      {/*Slider*/}
      <View style={[m('b', 9)]}>
        <Slider onScroll={onScroll} navigation={navigation}/>
      </View>
      <Animated.View
        style={[flex.row, style]}
      >
        {
          quips.map((quip, i) => {
            const z = [.75, 1.0, .75]
            const input = [(i-1) * 274, i * 274, (i+1) * 274]

            const iStyle = useAnimatedStyle(() => ({
              transform: [
                {perspective: 1000},
                {scale: interpolate(scrollX.value, input, z)}
              ]
            }))

            return (
              <Animated.View key={i} style={[p('x', 6), {width: width}, iStyle]}>
                <View style={flex.row}>
                  <LogoText fill={quip.color} width={66} height={29}/>
                  <Text style={[m('l', 1), typography.h5, {color: theme.colors.s1}]}>
                    {capitalize(quip.name)}
                  </Text>
                </View>
                <View style={[m('t', 2)]}>
                  <Text style={[typography.t2]}>
                    {quip.description}
                  </Text>
                </View>
                <View style={[p('t', 4)]}>
                  <ButtonClick onPress={() => {
                    add({
                      id: performance.now().toString(),
                      type: (() => {
                        //return a random type
                        const types = ["success", "error", "warning", "info"] as const
                        return types[Math.floor(Math.random() * types.length)]
                      })(),
                      message: "Coming Soon!",
                      timeout: 3000,
                    })
                  }} buttonColor={(quip.color as string)} labelStyle={typography.button1} contentStyle={styles.playButton} mode="contained">
                    Play Now
                  </ButtonClick>
                </View>
              </Animated.View>
            )
          })
        }
      </Animated.View>
    </View>
  </Screen>)
}

export default function Home({navigation}: NativeStackScreenProps<ParamListBase, "gameHome">) {
  return (
    <Quip.Navigator id="quip" initialRouteName={"home"} quipNavBarStyle={{}} contentStyle={{
      height: "100%",
    }}>
      <Quip.Screen name="games" component={GameHome}/>
      <Quip.Screen name="wallet" component={Wallet}/>
      <Quip.Screen name="settings" component={Settings}/>
      <Quip.Screen name="gameInfo" component={Info}/>
      <Quip.Screen name="profile" component={Profile} />
    </Quip.Navigator>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  playerBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playButton: {
    height: 56,
    borderRadius: 24,
  }
})
