import {StyleSheet, View, ViewProps} from "react-native";
import {border} from "../styles/Border";
import {m, p} from "../styles/Spacing";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {theme} from "@/util/Theme"
import {flex} from "../styles/Flex";
import {Text} from "../text/Text";
import {typography} from "../styles/Typography";
import RippleClick from "../animations/RippleClick";

interface PasteItemProps extends ViewProps {
  value: string;
  onPress: () => void
}

export function PasteItem(props: PasteItemProps) {
  return (
    <RippleClick minScale={.85} borderless onPress={props.onPress} style={[border.quip, p('a', 4), props.style, styles.pasteItem]}>
      <View style={[flex.row, flex.alignCenter]}>
        <FontAwesome style={m('r', 4)} name="paste" color={theme.colors.p1} size={24}/>
        <View style={flex.shrink}>
          <Text style={[typography.p3, {opacity: .4}]}>Paste from clipboard</Text>
          <Text style={[typography.label2]}>{props.value}</Text>
        </View>
      </View>
    </RippleClick>
  );
}

const styles = StyleSheet.create({
  pasteItem: {
    borderRadius: 24,
  }
});

export default PasteItem;
