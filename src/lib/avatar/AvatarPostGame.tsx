import {Pressable, PressableProps, View, ViewProps} from "react-native";
import Avatar, {AvatarProps} from "./Avatar";
import {theme} from "@/util/Theme"
import {typography} from "../styles/Typography";
import {p} from "../styles/Spacing";
import React from "react";
import Svg, {Circle} from "react-native-svg";
import {Text} from "../text/Text"
import {PlayfulAvatar} from "../avatar/PlayfulAvatar";
import {useAvatarStore} from "../store/AvatarStore";
import {useGameStore, quips} from "../store/GameStore";


interface AvatarPostGameProps {
  percentage: number,
  levelText: string,
  size?: number,
}

export function AvatarPostGame(props: ViewProps & AvatarPostGameProps & PressableProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const svgPercentage = 1 - props.percentage
  const size = props.size ?? 64
  const scale = size / 64
  const radius = size / 2
  const strokeWidth = 4 * scale
  const circum = radius * 2 * Math.PI

  const {avatar} = useAvatarStore()

  return (
    <Pressable {...props}>
      <View style={[{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }, props.style]}>
        <View style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <View style={{position: "absolute"}}>
            <PlayfulAvatar size={size-(14 * scale)} color={avatar.color} eye={avatar.eye} face={avatar.face} mouth={avatar.mouth} outfit={avatar.outfit} hair={avatar.hair} accessory={avatar.accessory}/>
          </View>
        </View>
        <View style={{
          position: "absolute",
          padding: 3,
          backgroundColor: quip.bgColor,
          borderRadius: 9999,
          right: -4,
          bottom: -4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: quip.color,
            height: 30,
          }}>
            <Text style={[typography.button2, p('x', 2), { color: theme.colors.s2 }]}>
              {props.levelText}
            </Text>
          </View>
        </View>
        <Svg width={size} height={size}>
          <Circle
            cx={size/2}
            cy={size/2}
            fill="transparent"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            stroke={theme.colors.s2}
            r={size/2 - strokeWidth/2}
          />
          <Circle
            cx={size/2}
            cy={size/2}
            fill="transparent"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            stroke={quip.color}
            r={size/2 - strokeWidth/2}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * svgPercentage}
            transform={`rotate(90, ${size/2}, ${size/2})`}
          />
        </Svg>
      </View>
    </Pressable>
  )
}

export default AvatarPostGame;
