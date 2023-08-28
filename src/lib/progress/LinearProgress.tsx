import {View} from "react-native";
import {theme} from "@/util/Theme"
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";
import Animated from "react-native-reanimated";

interface LinearProgressProps {
  percentage: number,
  color?: string,
  backgroundColor?: string,
  height?: number,
  borderRadius?: number,
}

export function LinearProgress(props: LinearProgressProps) {
  const width = useSharedValue<`${number}%`>(`${props.percentage}%`)
  const style = useAnimatedStyle(() => ({
    width: withTiming(width.value)
  }))

  useEffect(() => {
    width.value = `${props.percentage}%`
  }, [props.percentage])

  return (
    <View style={{
      position: "relative",
      width: "100%",
      height: props.height ?? 12,
      backgroundColor: props.backgroundColor ?? theme.colors.s5,
      borderRadius: props.borderRadius ?? 9999,
      overflow: "hidden",
    }}>
      <Animated.View style={[{
        position: "absolute",
        height: "100%",
        backgroundColor: props.color ?? theme.colors.primary,
        borderRadius: props.borderRadius ?? 9999,
      }, style]}/>
    </View>
  )
}

export default LinearProgress
