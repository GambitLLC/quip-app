import {StyleSheet, View} from "react-native";
import {flex} from "../styles/Flex";
import {Text} from "../text/Text"
import {TouchableRipple} from "react-native-paper";
import {eyes, faces, mouths, accessories, hairs, outfits} from "./types";
import {useState} from "react";

type SelectorType = typeof eyes | typeof faces | typeof mouths | typeof accessories | typeof hairs | typeof outfits

interface SelectorProps<T extends SelectorType> {
  onLeft: (item: T[number]) => void,
  onRight: (item: T[number]) => void,
  items: T,
  initialIdx?: number,
}

export function Selector<T extends SelectorType>(props: SelectorProps<T>) {
  const [idx, setIdx] = useState(props.initialIdx ?? 0)

  return (
    <View style={[styles.container, flex.row, flex.alignCenter]}>
      <TouchableRipple onPress={() => {
        setIdx((idx - 1 + props.items.length) % props.items.length)
        props.onLeft(props.items[(idx - 1 + props.items.length) % props.items.length])
      }} style={[styles.btn, flex.row, flex.center]}>
        <Text>{"<"}</Text>
      </TouchableRipple>
      <View style={[flex.grow, flex.center]}>
        <Text>{props.items[idx]}</Text>
      </View>
      <TouchableRipple onPress={() => {
        setIdx((idx + 1) % props.items.length)
        props.onRight(props.items[(idx + 1) % props.items.length])
      }} style={[styles.btn, flex.row, flex.center]}>
        <Text>{">"}</Text>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 295,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
  }
})