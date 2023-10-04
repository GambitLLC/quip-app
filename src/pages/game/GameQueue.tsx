import {View, StyleSheet} from "react-native";
import {GameQueueProps} from "@/pages/game/GameScreen";
import {border, flex, m, p, QueueSvg, quips, Screen, spacing, Text, typography, useGameStore} from "@/lib";
import theme from "@/util/Theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useEffect, useMemo, useState} from "react";
import {Button} from "react-native-paper";

interface QueueTipProps {
  tip: string
}

function QueueTip(props: QueueTipProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  return (
    <View style={[
      border.quip,
      flex.fillW,
      p('y', 4),
      p('x', 6),
      {
        borderRadius: 16,
        backgroundColor: theme.colors.background
      },
      flex.row
    ]}>
      <View style={[
        {
          width: 36,
          height: 36,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: quip.color,
          backgroundColor: quip.bgColor,
        },
        flex.row,
        flex.center,
        m('r', 4)
      ]}>
        <MaterialIcons name="privacy-tip" size={24} color={quip.color}/>
      </View>
      <Text style={{flex: 1, flexWrap: 'wrap'}}>
        <Text style={{fontFamily: "Lexend-700", fontSize: 14}}>TIP: </Text><Text style={{fontFamily: "Lexend-300", fontSize: 14}}>{props.tip}</Text>
      </Text>
    </View>
  )
}

export function GameQueue({route, navigation}: GameQueueProps) {
  const {quipIdx} = useGameStore()
  const quip = quips[quipIdx]

  const [ellipsis, setEllipsis] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis(ellipsis => ellipsis.length < 3 ? ellipsis + "." : "")
    }, 1000)

    const queueTimeout = setTimeout(() => {
      navigation.push("game")
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(queueTimeout)
    }
  }, [])

  return (
    <Screen style={[spacing.fill, {backgroundColor: quip.bgColor}, p('b', 14)]}>
      <View style={[flex.col, flex.alignCenter, flex.fill, p('x', 6)]}>
        <View style={m('t', 4)}>
          <QueueSvg/>
        </View>
        <Text style={[typography.h6, m('t', 8)]}>
          Searching for a match{ellipsis}
        </Text>
        <View style={flex.grow}/>
        <View style={[flex.fillW]}>
          <QueueTip tip={"Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmodo."}/>
        </View>
        <View style={[p('t', 10), flex.fillW]}>
          <Button theme={{
            colors: {
              primary: theme.colors.s1,
            }
          }} onPress={() => {
            navigation.goBack()
          }} mode={"outlined"} contentStyle={{height: 56}}>
            <Text style={typography.button1}>
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default GameQueue