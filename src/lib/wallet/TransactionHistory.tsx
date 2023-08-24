import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {m, spacing,} from "../styles/Spacing";
import {TransactionDayInfoRow} from "./TransactionDayInfoRow";
import {border} from "../styles/Border";
import {TransactionItemView} from "./TransactionItem";
import {theme} from "@/util/Theme"
import {useState, useCallback} from "react";
import { useCrypto } from "../context/CryptoContext";
import {FlashList} from "@shopify/flash-list";
import {flex} from "@/lib";

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
    <View style={spacing.fill}>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        decelerationRate={0}
        showsVerticalScrollIndicator={false}
        data={transactions}
        estimatedItemSize={500}
        renderItem={({ item }) => {
          const d = item
          return (
            <View style={[m('t', 4)]}>
              <TransactionDayInfoRow day={item}/>
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
        }}
      />
    </View>
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
