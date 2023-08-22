import {StyleSheet, View} from "react-native";
import {Screen, spacing, Text} from "@/lib";

interface BuyProps {

}

export function Buy(props: BuyProps) {
  return (
    <Screen style={[spacing.fill]}>
      <View style={[spacing.fill]}>
        <Text>Buy!</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Buy;
