import {StyleSheet, View} from "react-native"
import {m, p} from "../styles/Spacing";
import {Text} from "../text/Text";
import {theme} from "@/util/Theme"
import {TouchableRipple} from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {INotification, useNotificationStore} from "../store/NotificationStore";
import {flex} from "../styles/Flex"
import {LinearProgressTimeout} from "../progress/LinearProgressTimeout";
import Animated, {CurvedTransition, withTiming} from "react-native-reanimated";

interface NotificationProps {
  notification: INotification,
  style?: any,
}

function NotificationEnter(targetValues: any) {
  'worklet'
  const animations = {
    opacity: withTiming(1),
    height: withTiming(72),
    borderRadius: withTiming(16),
  };
  const initialValues = {
    opacity: 0,
    height: 0,
    borderRadius: 18,
  };
  return {
    initialValues,
    animations,
  };
}

function NotificationExit(targetValues: any) {
  'worklet';
  const animations = {
    opacity: withTiming(0),
    height: withTiming(0),
    borderRadius: withTiming(16),
  };
  const initialValues = {
    opacity: 1,
    height: 72,
    borderRadius: 16,
  };
  return {
    initialValues,
    animations,
  };
}

export default function Notification(props: NotificationProps) {
  const {notification} = props
  const {remove} = useNotificationStore()

  const name = (() => {
    switch (props.notification.type) {
      case "success":
        return "check"
      case "warning":
        return "warning"
      case "error":
        return "warning"
      case "info":
        return "info"
    }
  })()

  return (
    <Animated.View
      pointerEvents="auto"
      style={[
        props.style,
        styles.notification,
        m('y', 1),
        {
          backgroundColor: ((() => {
            switch (notification.type) {
              case "error":
                return theme.colors.error
              case "success":
                return theme.colors.success
              case "info":
                return theme.colors.info
              case "warning":
                return theme.colors.warning
              default:
                return theme.colors.info
            }
          })()),
        },
      ]}
      entering={NotificationEnter}
      exiting={NotificationExit}
      layout={CurvedTransition}
    >
      <View style={[p('a', 4)]}>
        <View style={styles.notificationContent}>
          <View style={[flex.row, flex.alignCenter]}>
            <FontAwesome size={16} color={theme.colors.white} name={name}/>
            <Text style={[m('l', 3), styles.notificationText]}>{notification.message}</Text>
          </View>
          <TouchableRipple borderless style={[styles.closeBtn]} onPress={() => {
            remove(notification)
          }}>
            <View>
              <FontAwesome name={"times"} size={16} color={theme.colors.white} />
            </View>
          </TouchableRipple>
        </View>
        <LinearProgressTimeout
          percentage={100}
          height={4}
          color={theme.colors.white}
          backgroundColor={"rgba(255, 255, 255, 0.2)"}
          borderRadius={2}
          timeout={notification.timeout}
          onTimeout={() => {
            remove(notification)
          }}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  notification: {
    overflow: "hidden",
    borderRadius: 16,
    shadowColor: "#1D1D1D",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    position: "relative",
  },

  notificationContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationText: {
    color: theme.colors.white,
    fontSize: 14,
    flexShrink: 1,
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})
