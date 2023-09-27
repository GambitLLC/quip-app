import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Rect,
  Circle,
  Defs,
  Pattern,
  ClipPath,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from "react"
import {Image, View} from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import {flex} from "../styles/Flex";
import {quips, useGameStore} from "../store/GameStore";

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedPath = Animated.createAnimatedComponent(Path)

const SvgComponent = (props: SvgProps) => {
  const avatarTransforms = [
    [
      {rotate: "-29.86deg"},
      {translateX: 4},
      {translateY: 17},
    ],
    [
      {rotate: "-23.75deg"},
      {translateX: 30},
      {translateY: -55},
    ],
    [
      {rotate: "18.61deg"},
      {translateX: -17},
      {translateY: 25},
    ],
    [
      {rotate: "18.61deg"},
      {translateX: -37},
      {translateY: -14},
    ]
  ]

  const avatarWaveStyles = avatarTransforms.map((t, i) => useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withDelay(i*250, withRepeat(
          withSequence(
            withTiming(0, {duration: 1000}),
            withTiming(5, {duration: 1000})),
          -1, true
        ))
      }
    ],
  })))

  //create an animated style that transforms the search glass using translateX and translateY in a circular motion
  const searchGlassProps = useAnimatedProps(() => ({
    transform: [
      {
        translateX: withRepeat(
          withSequence(
            withTiming(0, {duration: 1000}),
            withTiming(5, {duration: 1000})),
          -1, true
        )
      },
      {
        translateY: withDelay(500, withRepeat(
          withSequence(
            withTiming(0, {duration: 1000}),
            withTiming(5, {duration: 1000})),
          -1, true
        ))
      }
    ]
  }))

  const circles = [0, 1, 2]

  const circleProps = circles.map((_, i) => useAnimatedProps(() => ({
    r: withDelay(i * 1000, withRepeat(
      withSequence(
        withTiming(6, {duration: 1500}),
        withTiming(8, {duration: 1500})
      ),
      -1, true
    ))
  })))

  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const bgColor = [
    "#9BE9F2",
    "#C2F1C3",
    "#d7d0ff",
  ][quipIdx]

  return <View style={{position: "relative", width: 311}}>
    <Animated.View style={avatarWaveStyles[0]}>
      <Animated.View style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          transform: avatarTransforms[0],
          zIndex: 2
        },
      ]}>
        <Image style={{width: 80, height: 80}} source={require("../../../assets/QueueHead1.png")}/>
      </Animated.View>
    </Animated.View>
    <Animated.View style={avatarWaveStyles[1]}>
      <Animated.View style={[
        {
          position: "absolute",
          top: 0,
          right: 0,
          transform: avatarTransforms[2],
          zIndex: 2
        },
      ]}>
        <Image style={{width: 55, height: 55}} source={require("../../../assets/QueueHead2.png")}/>
      </Animated.View>
    </Animated.View>
    <Animated.View style={[avatarWaveStyles[2], flex.fill, {position: "absolute", zIndex: 2}]}>
      <Animated.View style={[
        {
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: avatarTransforms[3],
          zIndex: 2
        },
      ]}>
        <Image style={{width: 55, height: 55}} source={require("../../../assets/QueueHead4.png")}/>
      </Animated.View>
    </Animated.View>
    <Animated.View style={[avatarWaveStyles[3], flex.fill, {position: "absolute", zIndex: 2}]}>
      <Animated.View style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          transform: avatarTransforms[1],
          zIndex: 2
        },
      ]}>
        <Image style={{width: 55, height: 55}} source={require("../../../assets/QueueHead3.png")}/>
      </Animated.View>
    </Animated.View>
    <Svg
      width={311}
      height={333}
      fill="none"
      {...props}
    >
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Path
            fill={bgColor}
            d="M161 303c66.274 0 120-53.726 120-120S227.274 63 161 63 41 116.726 41 183s53.726 120 120 120Z"
          />
          <G filter="url(#c)">
            <Rect
              width={124.537}
              height={155.029}
              x={100}
              y={97.557}
              fill="#fff"
              rx={16}
            />
          </G>
          <Rect
            width={50}
            height={9.8}
            x={111}
            y={117.557}
            fill="#011625"
            rx={4.9}
          />
          <Rect
            width={100}
            height={9.8}
            x={111}
            y={145.356}
            fill="#D5D5D5"
            rx={4.9}
          />
          <Rect
            width={100}
            height={9.8}
            x={111}
            y={173.157}
            fill="#D5D5D5"
            rx={4.9}
          />
          <Rect
            width={100}
            height={9.8}
            x={111}
            y={200.957}
            fill="#D5D5D5"
            rx={4.9}
          />
          <Rect
            width={100}
            height={9.8}
            x={111}
            y={228.757}
            fill="#D5D5D5"
            rx={4.9}
          />
          <G filter="url(#d)">
            <Path
              fill="#fff"
              d="M299.15 80.424h-60.081c-2.799 0-5.069 2.388-5.069 5.335v29.719c0 2.946 2.27 5.335 5.069 5.335h60.081c2.799 0 5.069-2.389 5.069-5.335v-29.72c0-2.946-2.27-5.334-5.069-5.334Z"
            />
          </G>
          <Path fill="#CCC6D9" d="M249 107a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
          <Rect width={32} height={12} x={263} y={95} fill="#D5D5D5" rx={6}/>
          {/* --- START HERE ---*/}
          <AnimatedG animatedProps={searchGlassProps}>
            <Path
              fill="#CCC6D9"
              fillRule="evenodd"
              d="M196.109 259.563c12.88 0 24.85-3.896 34.796-10.573l40.699 38.851 14.76-17.125-39.273-37.49c7.254-10.208 11.518-22.687 11.518-36.163 0-34.517-27.982-62.5-62.5-62.5-34.517 0-62.5 27.983-62.5 62.5 0 34.518 27.983 62.5 62.5 62.5Zm53.309-62.499c0 29.223-23.69 52.913-52.913 52.913-29.223 0-52.913-23.69-52.913-52.913 0-29.224 23.69-52.914 52.913-52.914 29.223 0 52.913 23.69 52.913 52.914Z"
              clipRule="evenodd"
            />
            <G filter="url(#e)">
              <Path
                fill="#fff"
                fillOpacity={0.3}
                d="M196.5 251c30.1 0 54.5-24.177 54.5-54s-24.4-54-54.5-54-54.5 24.177-54.5 54 24.4 54 54.5 54Z"
              />
            </G>
            <Path
              fill="#E1DCEB"
              d="m271.602 287.843 14.76-17.125 2.223 2.122c2.157 2.059 3.448 4.935 3.59 7.997.142 3.061-.878 6.056-2.834 8.326-1.957 2.27-4.69 3.629-7.599 3.778-2.909.15-5.755-.923-7.912-2.982l-2.223-2.123-.005.007Z"
            />
          </AnimatedG>
          {/*--- END HERE ---*/}
          <Path
            fill="#011625"
            fillRule="evenodd"
            d="M67.314 125.172a18.973 18.973 0 0 0-.555-4.313c-1.255-5.082-6.853-8.344-12.81-9.111-5.956-.768-12.15.978-14.537 5.399-1.365 2.527-1.553 4.706-.995 6.542.555 1.827 1.873 3.342 3.662 4.522 4.989 3.287 13.724 3.958 17.71 2.584a44.62 44.62 0 0 0 5.397-2.282c-1.002 5.746-4.738 11.19-9.724 16.095-10.836 10.661-27.65 18.752-36.807 21.727-.492.16-.765.706-.613 1.219.153.514.676.802 1.168.642 9.338-3.034 26.48-11.297 37.53-22.17 5.709-5.615 9.776-11.936 10.47-18.582 12.906-7.202 23.503-20.267 32.564-31.262a1.004 1.004 0 0 0-.099-1.375.907.907 0 0 0-1.316.104C89.67 105.456 79.581 118 67.314 125.172Zm-1.876 1.045c.071-1.603-.08-3.231-.487-4.873-1.085-4.399-6.073-7-11.231-7.664-3.161-.406-6.412-.071-8.962 1.119-1.603.747-2.924 1.831-3.72 3.307-1.044 1.935-1.27 3.589-.842 4.993.428 1.414 1.493 2.55 2.88 3.462 4.545 2.997 12.499 3.634 16.127 2.383a44.007 44.007 0 0 0 6.235-2.727Z"
            clipRule="evenodd"
          />
          <AnimatedG animatedProps={avatarWaveStyles[3]}>
            <Path
              fill={quip.color}
              fillRule="evenodd"
              d="M69.384 259.395c1.071-.402 2.198-.936 3.067-1.708 1.032-.918 1.451-2.1 1.733-3.344.362-1.598.507-3.301.945-4.902.163-.594.476-.819.61-.919a1.44 1.44 0 0 1 1.004-.294c.382.029.907.181 1.252.856.05.096.114.243.157.445.031.147.051.609.085.799.083.469.152.938.217 1.41.218 1.569.343 2.902 1.029 4.343.93 1.957 1.864 3.155 3.129 3.685 1.223.513 2.686.417 4.555.015.178-.046.354-.085.528-.116.824-.152 1.612.417 1.774 1.281.161.864-.362 1.705-1.179 1.895-.17.039-.338.077-.505.111-2.525.658-5.449 3.006-7.148 5.063-.523.634-1.29 2.406-2.072 3.537-.578.834-1.226 1.384-1.77 1.578a1.522 1.522 0 0 1-.928.045 1.567 1.567 0 0 1-.91-.641 1.872 1.872 0 0 1-.304-.742c-.027-.151-.03-.535-.03-.708-.159-.577-.354-1.141-.496-1.723-.339-1.389-1.004-2.269-1.794-3.431-.74-1.087-1.533-1.77-2.697-2.315-.151-.039-1.373-.354-1.804-.535-.63-.265-.93-.708-1.04-.947a1.902 1.902 0 0 1-.167-1.055c.055-.436.24-.809.57-1.11.205-.187.51-.369.919-.458.315-.069 1.153-.11 1.27-.115Zm7.166-2.265c.057.133.117.267.181.401 1.364 2.867 2.889 4.467 4.743 5.244l.062.025c-1.24.969-2.363 2.052-3.22 3.09-.354.427-.822 1.315-1.327 2.226-.459-1.571-1.21-2.681-2.154-4.07-.72-1.06-1.477-1.858-2.405-2.508.72-.39 1.408-.846 2.007-1.378.996-.887 1.656-1.914 2.113-3.03Z"
              clipRule="evenodd"
            />
          </AnimatedG>
        </G>
        <AnimatedCircle cx={168} cy={46} animatedProps={circleProps[0]} fill={quip.color}/>
        <AnimatedCircle cx={296} cy={218} animatedProps={circleProps[1]} fill={quip.color}/>
        <AnimatedCircle cx={20} cy={137} animatedProps={circleProps[2]} fill={quip.color}/>
        <Path
          fill="url(#f)"
          d="M0 0h66v66H0z"
          transform="rotate(-29.862 63.493 16.931)"
        />
        <Path
          fill="url(#g)"
          d="M0 0h39.256v39.256H0z"
          transform="rotate(18.605 84.528 783.917)"
        />
        <Path
          fill="url(#h)"
          d="M0 0h39.256v39.256H0z"
          transform="rotate(18.605 -682.08 887.55)"
        />
        <Path
          fill="url(#i)"
          d="M0 0h39.256v39.256H0z"
          transform="rotate(-23.752 572.556 120.406)"
        />
      </G>
      <Defs>
        <Pattern
          id="f"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
        </Pattern>
        <Pattern
          id="g"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
        </Pattern>
        <Pattern
          id="h"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
        </Pattern>
        <Pattern
          id="i"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
        </Pattern>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h311v333H0z"/>
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M11 34h300v300H11z"/>
        </ClipPath>
      </Defs>
    </Svg>
  </View>
}
export const QueueSvg = memo(SvgComponent)
export default QueueSvg
