import {StyleSheet, View} from "react-native";
import {flex} from "../styles/Flex";
import {Text} from "../text/Text"
import {TouchableRipple} from "react-native-paper";
import {eyes, faces, mouths, accessories, hairs, outfits} from "./types";
import {useState} from "react";
import {FontAwesome5} from "@expo/vector-icons";

type SelectorType = typeof eyes | typeof faces | typeof mouths | typeof accessories | typeof hairs | typeof outfits

interface SelectorProps<T extends SelectorType> {
  onLeft: (item: T[number]) => void,
  onRight: (item: T[number]) => void,
  items: T,
  initialItem?: T[number],
}

export function Selector<T extends SelectorType>(props: SelectorProps<T>) {
  // @ts-ignore
  const initialIdx = props.initialItem === undefined ? 0 : props.items.indexOf(props.initialItem)
  const [idx, setIdx] = useState(initialIdx)

  return (
    <View style={[styles.container, flex.row, flex.alignCenter]}>
      <TouchableRipple borderless onPress={() => {
        setIdx((idx - 1 + props.items.length) % props.items.length)
        props.onLeft(props.items[(idx - 1 + props.items.length) % props.items.length])
      }} style={[styles.btn, flex.row, flex.center, {borderRadius: 9999}]}>
        <FontAwesome5 size={24} name="angle-left"/>
      </TouchableRipple>
      <View style={[flex.grow, flex.center]}>
        <Text>{props.items[idx]}</Text>
      </View>
      <TouchableRipple borderless onPress={() => {
        setIdx((idx + 1) % props.items.length)
        props.onRight(props.items[(idx + 1) % props.items.length])
      }} style={[styles.btn, flex.row, flex.center, {borderRadius: 9999}]}>
        <FontAwesome5 size={24} name="angle-right"/>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 295,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 24,
  }
})