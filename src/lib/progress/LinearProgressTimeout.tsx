import {View} from "react-native";
import {theme} from "@/util/Theme"
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";

interface LinearProgressTimeoutProps {
  percentage: number,
  color?: string,
  backgroundColor?: string,
  height?: number,
  borderRadius?: number,
  timeout?: number,
  onTimeout?: () => void,
}

export function LinearProgressTimeout(props: LinearProgressTimeoutProps) {
  const width = useSharedValue<`${number}%`>(`${props.percentage}%`)

  const style = useAnimatedStyle(() => ({
    width: withTiming(width.value, {
      duration: props.timeout ?? 5000,
      easing: Easing.linear
    }, (done) => {
      if (done && props.onTimeout) {
        runOnJS(props.onTimeout)()
      }
    })
  }), [])

  useEffect(() => {
    width.value = `0%`
  }, [])

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

export default LinearProgressTimeout
