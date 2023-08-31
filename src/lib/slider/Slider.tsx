import {StyleSheet, View, ViewProps} from "react-native";
import React, {useMemo} from "react";
import {p} from "../styles/Spacing";
import Card from "../game/Card";
import {theme} from "@/util/Theme"
import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useGameStore} from "../store/GameStore";
import Animated, {
  interpolate, runOnJS, scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle, useDerivedValue,
  useSharedValue
} from "react-native-reanimated";

const scrollOffset = 0

interface SliderProps {
  navigation:  NativeStackNavigationProp<ParamListBase>,

}

export function Slider(props: ViewProps & SliderProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const snapOffsets = [...Array(5).keys()].map(index => (index * 274) - 50).slice(1, 4)

  const dragStartOffset = useSharedValue(0)
  const scrollX = useSharedValue(snapOffsets[1])

  const { quipIdx, setQuipIdx } = useGameStore()

  useDerivedValue(() => {
    const idx = Math.round(interpolate(scrollX.value, snapOffsets, [0, 1, 2]))
    if (idx !== quipIdx) {
      runOnJS(setQuipIdx)(idx)
    }
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
    onBeginDrag: (e) => {
      dragStartOffset.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      console.log("momentum end")
      const dx = dragStartOffset.value - e.contentOffset.x

      console.log(quipIdx)

      if (dx < -scrollOffset) {
        if (quipIdx < snapOffsets.length - 1) {
          console.log("right")
          scrollTo(scrollRef, snapOffsets[quipIdx + 1], 0, true)
        } else {
          console.log("snapBack")
          scrollTo(scrollRef, snapOffsets[quipIdx], 0, true)
        }
      }

      else if (dx > scrollOffset) {
        if (quipIdx > 0) {
          console.log("left")
          scrollTo(scrollRef, snapOffsets[quipIdx - 1], 0, true)
        } else {
          console.log("snapBack")
          scrollTo(scrollRef, snapOffsets[quipIdx], 0, true)
        }
      }
    },
  })

  const rotateCard1 = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${interpolate(scrollX.value, [0, 224, 1370], [20, 0, -20])}deg`}]
  }))

  const rotateCard2 = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${interpolate(scrollX.value, [0, 498, 1370], [20, 0, -20])}deg`}]
  }))

  const rotateCard3 = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${interpolate(scrollX.value, [0, 772, 1370], [20, 0, -20])}deg`}]
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
        ref={scrollRef}
        horizontal={true}
        decelerationRate={0}
        style={styles.scroller}
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        contentOffset={{x: snapOffsets[1], y: 0}}
        onScroll={scrollHandler}
        bounces={false}
        scrollEventThrottle={1}
      >
        <View style={{width: 274, height: 300}}/>
        <Animated.View style={[rotateCard1, p('x', 3)]}>
          {card1}
        </Animated.View>
        <Animated.View style={[rotateCard2, p('x', 3)]}>
          {card2}
        </Animated.View>
        <Animated.View style={[rotateCard3, p('x', 3)]}>
          {card3}
        </Animated.View>
        <View style={{width: 274, height: 300}}/>
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
