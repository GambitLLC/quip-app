import {View, StyleSheet} from "react-native";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {quips, useGameStore} from "../store/GameStore"
import {spacing} from "../styles/Spacing"
import {typography} from "../styles/Typography"
import theme from "@/util/Theme";
import {useMemo} from "react";
interface SelectedWagerTextProps {
  text: string,
  selected: boolean,
}

export function SelectedWagerText(props: SelectedWagerTextProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const isSelected = useMemo(() => {
    return props.selected
  }, [props.selected])

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isSelected ? theme.colors.white : quip.color as string, {duration: 250})
  }), [isSelected])

  return (
    <View style={[spacing.center, {paddingTop: 6}]}>
      <Animated.Text style={[typography.button1, textStyle]}>
        {props.text}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SelectedWagerText