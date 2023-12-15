import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  ViewProps,
  KeyboardAvoidingView,
  Keyboard, LogBox
} from "react-native";
import {GameModeSelectProps} from "@/pages/game/GameScreen";
import {
  flex,
  m,
  p,
  quips,
  Screen,
  spacing,
  Text,
  typography,
  useGameStore, useNotificationStore,
  WagerSelector
} from "@/lib";
import {forwardRef, Ref, useEffect, useMemo, useRef, useState} from "react";
import {capitalize} from "@/util/TextUtil";
import theme from "@/util/Theme";
import Svg, {Defs, Image, LinearGradient, Path, Pattern, Stop, Use} from "react-native-svg";
import {Button, TouchableRipple} from "react-native-paper";
import {FontAwesome5} from "@expo/vector-icons";
import {createThrottle} from "@/util/Debounce";
import Animated, {
  FadeIn, FadeOut,
  runOnJS,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

type GameMode = "quick" | "custom"

LogBox.ignoreLogs(["Overriding previous layout animation with new one before the first began"])


const GameCard = forwardRef((props: ViewProps, ref: Ref<View | undefined>) =>
  // @ts-ignore
  <View {...props} ref={ref}>
    <Svg width={"250"} height={"250"} viewBox="0 0 250 300" fill="none">
      <Path d="M2.37581 33.5854C2.72499 16.4755 16.4742 2.66867 33.5825 2.24797L125 0L216.417 2.24797C233.526 2.66867 247.275 16.4755 247.624 33.5854L250 150L247.624 266.415C247.275 283.525 233.526 297.331 216.417 297.752L125 300L33.5825 297.752C16.4742 297.331 2.72499 283.525 2.37581 266.415L0 150L2.37581 33.5854Z" fill="#D9D9D9"/>
      <Path d="M2.37581 33.5854C2.72499 16.4755 16.4742 2.66867 33.5825 2.24797L125 0L216.417 2.24797C233.526 2.66867 247.275 16.4755 247.624 33.5854L250 150L247.624 266.415C247.275 283.525 233.526 297.331 216.417 297.752L125 300L33.5825 297.752C16.4742 297.331 2.72499 283.525 2.37581 266.415L0 150L2.37581 33.5854Z" fill="url(#pattern0)"/>
      <Path d="M2.37581 33.5854C2.72499 16.4755 16.4742 2.66867 33.5825 2.24797L125 0L216.417 2.24797C233.526 2.66867 247.275 16.4755 247.624 33.5854L250 150L247.624 266.415C247.275 283.525 233.526 297.331 216.417 297.752L125 300L33.5825 297.752C16.4742 297.331 2.72499 283.525 2.37581 266.415L0 150L2.37581 33.5854Z" fill="url(#paint0_linear_267_3024)" fillOpacity={0.6}/>
      <Defs>
        <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
          <Use xlinkHref="#image0_267_3024" transform="matrix(0.00148148 0 0 0.00123457 -0.566667 0)"/>
        </Pattern>
        <LinearGradient id="paint0_linear_267_3024" x1="125" y1="106.5" x2="125" y2="300" gradientUnits="userSpaceOnUse">
          <Stop stopOpacity={0}/>
          <Stop offset={.8}/>
        </LinearGradient>
        <Image  id="image0_267_3024" width={1440} height={810} xlinkHref={require('../../../assets/game1.jpg')}/>
      </Defs>
    </Svg>
  </View>
)

export function GameModeSelect({route, navigation}: GameModeSelectProps) {
  const {add} = useNotificationStore()

  const [mode, setMode] = useState<GameMode>("quick")

  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const wagerOptions = [1.00, 5.00, 20.00]
  const [selectedWagerIdx, setSelectedWagerIdx] = useState(0)
  const [amt, setAmt] = useState<number>(0.00)

  const {width} = useWindowDimensions()
  const computedWidth = ((width) / 2) - 125

  const scrollViewRef = useRef<ScrollView>()
  const card1 = useRef<View>()
  const card2 = useRef<View>()

  const leftDebounce = createThrottle()
  const rightDebounce = createThrottle()

  function setModeToQuick() {
    if (mode === "quick") return
    setMode("quick")
  }

  function setModeToCustom() {
    if (mode === "custom") return
    setMode("custom")
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      const idx = Math.round(e.contentOffset.x / 250)

      if (idx === 0) {
        runOnJS(setModeToQuick)()
      } else if (idx === 1) {
        runOnJS(setModeToCustom)()
      } else {
        return
      }
    }
  })

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const MemoAnim1 = useMemo(() => {
    return <Animated.View style={[flex.col, flex.center]} entering={FadeIn.delay(200)} exiting={FadeOut.duration(200)} key={mode}>
      <Text style={[typography.label2, {color: quip.color}]}>SELECT MODE</Text>
      <Text style={[typography.h5]}>{capitalize(mode)} Match</Text>
    </Animated.View>
  }, [mode])

  const MemoAnim2 = useMemo(() => {
    return <Animated.View
      entering={FadeIn.delay(200)}
      exiting={FadeOut.duration(200)}
      key={`${mode}-inner`}
      style={[p('x', 6), flex.col, flex.alignCenter]}
    >
      <Text style={[typography.label2, {color: quip.color}]}>
        SELECT WAGER AMOUNT
      </Text>
      <WagerSelector
        initialIdx={selectedWagerIdx}
        onChangeIdx={setSelectedWagerIdx}
        onChangeAmt={setAmt}
        type={mode}
        options={wagerOptions}
      />
    </Animated.View>
  }, [mode])

  return (
    <Screen style={[spacing.fill, {backgroundColor: quip.bgColor}]} screenStyle={{
      position: "relative",
    }}>
      <KeyboardAvoidingView enabled={true} behavior={"position"} style={[flex.fill]}>
        <ScrollView scrollEnabled={false} contentContainerStyle={[flex.fill]} keyboardShouldPersistTaps="handled">
          <View style={[flex.col, flex.alignCenter, flex.fillH, p('t', 6), p('b', 14)]}>
            {MemoAnim1}
            <View style={[m('y', 12), flex.fillW, flex.row, flex.justifyCenter]}>
              <View pointerEvents="box-none" style={[styles.arrowsContainer, flex.row, flex.alignCenter, flex.spaceBetween]}>
                <TouchableRipple
                  onPress={() => {
                    leftDebounce(() => {
                      scrollViewRef.current?.scrollTo({x: 0, animated: true})
                    }, 250)
                  }}
                  borderless
                  style={[
                    flex.row,
                    flex.center,
                    {
                      width: 56,
                      height: 56,
                      backgroundColor: quip.color,
                      borderBottomRightRadius: 56,
                      borderTopRightRadius: 56,
                    },
                    p('r', 2)
                  ]}>
                  <FontAwesome5 size={24} color={theme.colors.white} name="angle-left"/>
                </TouchableRipple>
                <TouchableRipple
                  onPress={() => {
                    rightDebounce(() => {
                      scrollViewRef.current?.scrollToEnd({animated: true})
                    }, 250)
                  }}
                  borderless
                  style={[
                    flex.row,
                    flex.center,
                    {
                      width: 56,
                      height: 56,
                      backgroundColor: quip.color,
                      borderBottomLeftRadius: 56,
                      borderTopLeftRadius: 56,
                    },
                    p('l', 2)
                  ]}>
                  <FontAwesome5 size={24} color={theme.colors.white} name="angle-right"/>
                </TouchableRipple>
              </View>
              <Animated.ScrollView
                //@ts-ignore
                ref={scrollViewRef}
                onScroll={scrollHandler}
                scrollEventThrottle={1}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={250}
                decelerationRate="fast"
                snapToAlignment="start"
                contentContainerStyle={{
                  paddingLeft: computedWidth,
                  paddingRight: computedWidth,
                }}
              >
                <GameCard ref={card1}/>
                <GameCard ref={card2}/>
              </Animated.ScrollView>
            </View>
            <View style={flex.grow}/>
            {MemoAnim2}
            <View style={flex.grow}/>
            <View>
              <Button
                theme={{colors: {primary: quip.color as string}}}
                onPress={() => {
                  //check if the keyboard is open, if it is dismiss instead of navigation
                  if (isKeyboardVisible) {
                    Keyboard.dismiss()
                    return
                  }

                  navigation.goBack()
                }}
                style={[{width: 327}, m('b', 5)]}
                contentStyle={{height: 56}}
                mode="text"
              >
                <Text style={[typography.button1, {color: quip.color}]}>
                  Cancel
                </Text>
              </Button>
              <Button
                onPress={() => {
                  if (isKeyboardVisible) {
                    Keyboard.dismiss()

                    setTimeout(() => {
                      switch (mode) {
                        case "quick":
                          navigation.navigate("queue")
                          break
                        case "custom":
                          if (amt === 0) {
                            add({
                              type: "error",
                              message: "Please set a wager amount",
                              timeout: 3000,
                              id: performance.now().toString()
                            })
                            return
                          }
                          navigation.navigate("lobby")
                          break
                      }
                    }, 200)

                    return;
                  }

                  switch (mode) {
                    case "quick":
                      navigation.navigate("queue")
                      break
                    case "custom":
                      if (amt === 0) {
                        add({
                          type: "error",
                          message: "Please set a wager amount",
                          timeout: 3000,
                          id: performance.now().toString()
                        })
                        return
                      }
                      navigation.navigate("lobby")
                      break
                  }
                }}
                style={{width: 327}}
                contentStyle={{height: 56}}
                buttonColor={quip.color as string}
                mode="contained"
              >
                <Text style={[{color: theme.colors.white}, typography.button1]}>
                  {
                    mode === "quick" ? "Play Now" : "Create Lobby"
                  }
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  relative: {
    position: "relative",
  },
  arrowsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2
  }
})

export default GameModeSelect