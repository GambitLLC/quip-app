import {View, StyleSheet, TextInput} from "react-native";
import {border} from "../styles/Border"
import {flex} from  "../styles/Flex"
import {m, p} from "../styles/Spacing"
import {Text} from "../text/Text"
import {typography} from "../styles/Typography"
import {useGameStore, quips} from "../store/GameStore"
import {SelectedWagerText} from "./SelectedWagerText"
import theme from "@/util/Theme";
import {useMemo, useState} from "react";
import {Button} from "react-native-paper";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";

type WagerType = "quick" | "custom"

interface WagerSelectorProps {
  type: WagerType,
  options: number[]
  initialIdx?: number,
  onChange?: (idx: number) => void,
}

export function WagerSelector(props: WagerSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(props.initialIdx ?? 0)
  const [amt, setAmt] = useState<number>(props.options[0])
  const [elemWidths, setElemWidths] = useState<number[]>(props.options.map(() => 0))

  const computedLeftMargin = useMemo(() => {
    return elemWidths.map((width, i) => {
      //sum of previous widths + 16px margin
      return elemWidths.slice(0, i).reduce((a, b) => a + b + 16, 0)
    })
  },[elemWidths])

  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const selectedStyle = useAnimatedStyle(() => ({
    backgroundColor: quip.color,
    width: withTiming(elemWidths[selectedIdx] ?? 0, {duration: 250}),
    marginLeft: withTiming(computedLeftMargin[selectedIdx] ?? 0, {duration: 250}),
  }), [selectedIdx, elemWidths])

  return (
    <View style={[
      flex.row,
      flex.fillW,
      {
        height: 69,
        borderRadius: 24,
        backgroundColor: theme.colors.background,
      },
      border.quip, m('y', 4)
    ]}>
      {
        props.type === 'quick' ? (
          <View style={[flex.row, flex.fillW, {position: "relative"}]}>
            <View
              pointerEvents={"none"}
              style={[{position: "absolute"}, p('a', 2), flex.fillH, flex.row, flex.fillW]}
            >
              <Animated.View style={[flex.fillH, flex.row, flex.center, selectedStyle, {borderRadius: 24}]}>
                <Text style={[typography.button1, {opacity: 0}]}>
                  ${props.options[selectedIdx].toFixed(2)}
                </Text>
              </Animated.View>
            </View>
            {
              props.options.map((opt, i) => {
                return <Button
                  onLayout={(e) => {
                    const {width} = e.nativeEvent.layout

                    setElemWidths((prev) => {
                      const next = [...prev]
                      next[i] = width
                      // prev.map((n, idx) => idx == i ? width : n)
                      return prev.map((n, idx) => idx == i ? width : n)
                    })
                  }}
                  theme={{
                    colors: {
                      primary: quip.color as string,
                    }
                  }}
                  onPress={() => {
                    setSelectedIdx(i)
                    setAmt(opt)
                    props.onChange?.(i)
                  }}
                  key={i}
                  style={[
                    flex.grow,
                    m('a', 2),
                    m('x', 2),
                    {
                      borderRadius: 24,
                    },
                  ]}
                  contentStyle={[
                    flex.fillH,
                  ]}
                >
                  <SelectedWagerText key={i} selected={selectedIdx === i} text={`$${opt.toFixed(2)}`}/>
                </Button>
              })
            }
          </View>
        ) : (
          <View>
            <TextInput
              value={amt.toFixed(2)}
              onChangeText={(text) => {
                const num = parseFloat(text)
                if (isNaN(num)) return
                setAmt(num)
              }}
            />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
})

export default WagerSelector