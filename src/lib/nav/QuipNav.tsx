import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {theme} from "@/util/Theme"
import NavItem from "./NavItem";
import {p} from "../styles/Spacing";
import {
  CommonActions,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";
import {useEffect, useMemo, useState} from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig, withTiming
} from "react-native-reanimated";

type QuipTab = "games" | "wallet" | "settings"
type QuipTabIcon = "gamepad-variant" | "wallet" | "cog"
const tabs: QuipTab[] = ["games", "wallet", "settings"]
const icons = {
  "games": "gamepad-variant",
  "wallet": "wallet",
  "settings": "cog"
}

// Props accepted by the view
type QuipNavigationConfig = {
  quipNavBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
}

// Supported screen options
type QuipNavigationOptions = {
  title?: string;
}

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type QuipNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type QuipNavProps = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  QuipNavigationOptions,
  QuipNavigationEventMap
> &
  TabRouterOptions &
  QuipNavigationConfig;

export function QuipNavigator({
  initialRouteName,
  children,
  screenOptions,
  quipNavBarStyle,
  contentStyle,
}: QuipNavProps) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      QuipNavigationOptions,
      QuipNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  const memoKeys = useMemo(() => {
    return state.routes.map((e) => e.key)
  }, [])

  const memoRenders = useMemo(() => {
    return memoKeys.map(k => descriptors[k].render())
  }, [])

  const isTransitioning = useSharedValue(false)
  const transitioningFrom = useSharedValue<null | number>(null)
  const transitioningTo = useSharedValue<number>(state.index)

  const [to, setTo] = useState(transitioningTo.value)
  const [from, setFrom] = useState(transitioningFrom.value)

  const duration = 800
  const halfDuration = duration/2

  const outConfig: WithSpringConfig = {
    mass: 1,
    damping: 20,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 4,
  }

  const inConfig: WithSpringConfig = {
    mass: 1,
    damping: 20,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 4,
  }

  const transitions = memoRenders.map((render, i) => {
    return [
      render,
      useAnimatedStyle(() => {
        //isTrans
        if (isTransitioning.value) {
          //isFrom
          if (transitioningFrom.value === i) {
            return {
              opacity: withSpring(0, outConfig),
              transform: [
                {translateX: withSpring(-100, outConfig)}
              ],
              overflow: "visible"
            }
          }

          //isTo
          else if (transitioningTo.value === i) {
            return {
              opacity: withDelay(halfDuration, withSpring(1, inConfig, (done) => {
                if (done) isTransitioning.value = false
              })),
              transform: [
                {translateX: withDelay(halfDuration, withSpring(0, inConfig))}
              ],
              overflow: "visible"
            }
          }

          //isNeither
          else {
            return {
              opacity: 0,
              transform: [
                {translateX: -100}
              ],
              overflow: "hidden"
            }
          }
        } else {
          return {
            opacity: transitioningTo.value === i ? 1 : 0,
            transform: [
              {translateX: transitioningTo.value === i ? 0 : -100}
            ],
            overflow: "hidden"
          }
        }
      })
    ] as const
  }, [memoRenders])

  const shownRoutes = [
    "games",
    "wallet",
    "settings"
  ]

  useEffect(() => {
    //decide if we should hide navbar
    const name = state.routes[state.index].name
    isHidden.value = !shownRoutes.includes(name)

    //determine the rest of the transition
    transitioningTo.value = state.index
    setTo(state.index)

    return () => {
      //trigger transition
      transitioningFrom.value = transitioningTo.value
      setFrom(transitioningFrom.value)
      isTransitioning.value = true
    }
  }, [state.index])

  const isHidden = useSharedValue(false)

  const navBarStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: withSpring(isHidden.value ? 100 : 0, {overshootClamping: true})}
    ]
  }))

  const fillerStyle = useAnimatedStyle(() => {
    if (isTransitioning.value) {
      if (isHidden.value) {
        return {
          height: 0,
          width: "100%",
          backgroundColor: "transparent"
        }
      } else {
        return {
          height: withDelay(halfDuration+150, withTiming(100, {duration: 0})),
          width: "100%",
          backgroundColor: "transparent"
        }
      }
    } else {
      return {
        height: isHidden.value ? 0 : 100,
        width: "100%",
        backgroundColor: "transparent"
      }
    }
  })

  return (
    <NavigationContent>
      <View style={styles.navContainer}>
        <View style={[{ flex: 1 }, contentStyle]}>
          {
            transitions.map(([render, style], i) =>
              <Animated.View
                key={i}
                style={[StyleSheet.absoluteFill, style]}
                pointerEvents={i === to ? "auto" : "none"}
              >
                {render}
              </Animated.View>
            )
          }
        </View>
        <Animated.View style={[fillerStyle]}/>
        <Animated.View style={[styles.quipNav, navBarStyle, p('x', 6), quipNavBarStyle]}>
          {state.routes.map((route, i) => {
            if (route.name === "gameInfo" || route.name === "profile") return null

            return (<NavItem onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
                data: {
                  isAlreadyFocused: route.key === state.routes[state.index].key,
                },
              });

              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...CommonActions.navigate(route),
                  target: state.key,
                });
              }
            }} key={i} active={state.routes[state.index].name === route.name} icon={ icons[route.name as QuipTab] } label={route.name}/>)
          })}
        </Animated.View>
      </View>
    </NavigationContent>
  )
}

const styles = StyleSheet.create({
  filler: {
    height: 100,
    width: "100%",
    backgroundColor: "red"
  },
  hidden: {
    height: 0,
    width: "100%",
    backgroundColor: "red"
  },
  quipNav: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    backgroundColor: theme.colors.s5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
    backgroundColor: theme.colors.background
  },
})

export const createQuipNavigator = createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  QuipNavigationOptions,
  QuipNavigationEventMap,
  typeof QuipNavigator
>(QuipNavigator);
