import {View, StyleSheet, TextInput} from "react-native";
import {border, flex, m, quips, Text, typography, useGameStore} from "@/lib";
import theme from "@/util/Theme";
import {useState} from "react";
import {Button, TouchableRipple} from "react-native-paper";

type WagerType = "quick" | "custom"

interface WagerSelectorProps {
  type: WagerType,
  options: number[]
  initialIdx?: number,
  onChange?: (idx: number) => void,
}

export function WagerSelector(props: WagerSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [amt, setAmt] = useState<number>(props.options[0])

  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

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
          <View style={[flex.row, flex.fillW]}>
            {
              props.options.map((opt, i) => (
                <Button
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
                      backgroundColor: i === selectedIdx ? quip.color : theme.colors.background,
                    },
                  ]}
                  contentStyle={[
                    flex.fillH,
                  ]}
                >
                  <Text style={[typography.button1, {color: i === selectedIdx ? theme.colors.background : theme.colors.s1}]}>
                    ${opt.toFixed(2)}
                  </Text>
                </Button>
              ))
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