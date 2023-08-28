import {StyleSheet, View} from 'react-native'
import {Screen} from "../screen/Screen";
import {useNotificationStore} from "../store/NotificationStore";
import {p} from "../styles/Spacing";
import React from "react";
import Notification from "./Notification";

interface NotificationBarProps {
  children: React.ReactNode,
}

export default function NotificationBar(props: NotificationBarProps) {
  const {notifications, remove} = useNotificationStore()

  return (
    <>
      {props.children}
      <View pointerEvents="box-none" style={styles.notificationBar}>
        <Screen pointerEvents="box-none" hasSafeArea={false} backgroundColor={"transparent"}>
          <View pointerEvents="box-none" style={[p('x', 8), p('t', 14)]}>
            <View style={{position: "relative"}}>
              {
                notifications.map(notification =>
                  <Notification
                    key={notification.id}
                    notification={notification}
                    style={{ height: 72 }}
                  />
                )
              }
            </View>
          </View>
        </Screen>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  notificationBar: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 1000,
  },
})

export {
  NotificationBar
}
