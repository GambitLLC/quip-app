import {p, Screen, spacing, TopWalletInfo, TransactionHistory} from "@/lib";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";
import {Suspense} from "react";

export default function Wallet({route, navigation}: NativeStackScreenProps<ParamListBase, "wallet">) {
  return (
    <Screen style={[spacing.fill]}>
      <View style={[spacing.fill, p('a', 4)]}>
        <TopWalletInfo/>
        <Suspense>
          <TransactionHistory/>
        </Suspense>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({

})
