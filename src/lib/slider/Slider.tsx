import {StyleSheet, useWindowDimensions, View, ViewProps} from "react-native";
import React, {useMemo} from "react";
import {p} from "../styles/Spacing";
import Card from "../game/Card";
import {theme} from "@/util/Theme"
import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Animated, {
  interpolate, runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import {QuipIDX, useGameStore, ValidQuipIDXs} from "../store/GameStore";

const scrollOffset = 0

interface SliderProps {
  navigation:  NativeStackNavigationProp<ParamListBase>,
  onScroll: (scrollX: number) => void
}

export function Slider(props: ViewProps & SliderProps) {
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

  const {quipIdx, setQuipIdx} = useGameStore()

  //track the selected quip based off of the scrollX value
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
      props.onScroll(e.contentOffset.x)

      const idx = Math.round(interpolate(e.contentOffset.x, snapOffsets, ValidQuipIDXs)) as QuipIDX
      if (!ValidQuipIDXs.includes(idx)) return

      if (idx !== quipIdx) {
        runOnJS(setQuipIdx)(idx)
      }
    }
  })

  const minScale = 0.876

  const rotateCard1 = useAnimatedStyle(() => ({
    transform: [
      {rotateZ: `${interpolate(scrollX.value, [-274, 0, 274], [10, 0, -10])}deg`},
      {scale: interpolate(scrollX.value, [-274, 0, 274], [minScale, 1, minScale])}
    ]
  }))

  const rotateCard2 = useAnimatedStyle(() => ({
    transform: [
      {rotateZ: `${interpolate(scrollX.value, [0, 274, 548], [10, 0, -10])}deg`},
      {scale: interpolate(scrollX.value, [0, 274, 548], [minScale, 1, minScale])}
    ]
  }))

  const rotateCard3 = useAnimatedStyle(() => ({
    transform: [
      {rotateZ: `${interpolate(scrollX.value, [274, 548, 822], [10, 0, -10])}deg`},
      {scale: interpolate(scrollX.value, [274, 548, 822], [minScale, 1, minScale])}
    ]
  }))

  const card1 = useMemo(() => (<Card
    imgSrc={require('../../../assets/game1.jpg')}
    cardColor={theme.colors.t1}
    cardTitle={"Think"}
    numPlayers={"25.3k Players"}
    isComingSoon={true}
    navigation={props.navigation}
  />), [])
  const card2 = useMemo(() => (
    <Card
      imgSrc={require('../../../assets/game1.jpg')}
      cardColor={theme.colors.p2}
      cardTitle={"Race"}
      numPlayers={"25.3k Players"}
      navigation={props.navigation}
    />
  ), [])
  const card3 = useMemo(() => (
    <Card
      imgSrc={require('../../../assets/game1.jpg')}
      cardColor={theme.colors.p1}
      cardTitle={"Shoot"}
      numPlayers={"25.3k Players"}
      isComingSoon={true}
      navigation={props.navigation}
    />
  ), [])

  return (
    <View style={[styles.container]} {...props}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        horizontal={true}
        snapToOffsets={snapOffsets}
        contentOffset={{x: snapOffsets[1], y: 0}}
        snapToAlignment="start"
        decelerationRate="fast"
        style={styles.scroller}
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{paddingLeft: offset, paddingRight: offset}}
      >
        <Animated.View style={[p('x', 3), rotateCard1]}>
          {card1}
        </Animated.View>
        <Animated.View style={[p('x', 3), rotateCard2]}>
          {card2}
        </Animated.View>
        <Animated.View style={[p('x', 3), rotateCard3]}>
          {card3}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 304,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },

  scroller: {
    overflow: "visible",
  }
})

export default Slider
