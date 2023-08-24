import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {m,} from "../styles/Spacing";
import {TransactionDayInfoRow} from "./TransactionDayInfoRow";
import {border} from "../styles/Border";
import {TransactionItemView} from "./TransactionItem";
import {theme} from "@/util/Theme"
import {useState, useCallback} from "react";
import { useCrypto } from "../context/CryptoContext";

interface TransactionHistoryProps {

}

export function TransactionHistory(props: TransactionHistoryProps) {
  const {transactions} = useCrypto()

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        decelerationRate={0}
        showsVerticalScrollIndicator={false}
    >
      {transactions.map((d, i) => {
        return (
          <View key={i} style={[m('t', 4)]}>
            <TransactionDayInfoRow day={d}/>
            <View style={[styles.dayContainer, border.quip]}>
              {d.items.map((t, i) => {
                return (
                  <View key={i}>
                    <TransactionItemView transaction={t}/>
                    {i < (d.items.length-1) && <View style={[styles.divider]}/>}
                  </View>
                )
              })}
            </View>
          </View>
        )
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    borderRadius: 16,
  },

  divider: {
    borderStyle: "solid",
    borderColor: theme.colors.s3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
  },
});

export default TransactionHistory;
