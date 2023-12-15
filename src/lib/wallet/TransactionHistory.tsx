import {RefreshControl, StyleSheet, View} from "react-native";
import {m, spacing,} from "../styles/Spacing";
import {TransactionDayInfoRow} from "./TransactionDayInfoRow";
import {border} from "../styles/Border";
import {TransactionItemView} from "./TransactionItem";
import {theme} from "@/util/Theme"
import {useCallback, useState} from "react";
import {useCrypto} from "../context/CryptoContext";
import {FlashList} from "@shopify/flash-list";
import {useNotificationStore} from "../store/NotificationStore";

interface TransactionHistoryProps {

}

export function TransactionHistory(props: TransactionHistoryProps) {
  const notifications = useNotificationStore()
  const {usdcTransactions, getUSDCTransactionList, getUSDCTokenBalance} = useCrypto()

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    Promise.all([
      getUSDCTransactionList(),
      getUSDCTokenBalance()
    ]).then(() => {
      notifications.add({
        id: performance.now().toString(),
        message: "Updated wallet!",
        type: "info"
      })
    }).catch((e) => {
      console.log(e)
      notifications.add({
        id: performance.now().toString(),
        message: "Failed fetch wallet!",
        type: "error"
      })
    }).finally(() => {
      setRefreshing(false)
    })
  }, []);


  return (
    <View style={spacing.fill}>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={usdcTransactions}
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
