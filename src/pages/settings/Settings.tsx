import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PlayfulAvatar, Screen, spacing, Selector, p, m, Balance, AvatarXp, Text, typography, border, flex} from "@/lib";
import {CommonActions, ParamListBase} from "@react-navigation/native";
import React, {useState} from "react";
import {Accessory, Eye, Face, Hair, Mouth, Outfit, accessories, eyes, faces, hairs, mouths, outfits} from "@/lib/avatar/types";
import {ScrollView, StyleSheet, Switch, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import theme from "@/util/Theme";
import {TouchableRipple} from "react-native-paper";

type SettingType = "screen" | "toggle" | "none"

interface SettingsItem {
  title: string
  type: SettingType
  default?: string
}

interface SettingsView {
  title: string
  settings: SettingsItem[]
}

const settings: SettingsView[] = [
  {
    title: "ACCOUNT",
    settings: [
      {title: "Change Avatar", type: "screen"},
      {title: "Change Display Name", type: "screen"},
      {title: "Refer a Friend", type: "screen"},
      {title: "Delete Account", type: "screen"}
    ]
  },
  {
    title: "SECURITY",
    settings: [
      {title: "2FA Setup", type: "screen"}
    ]
  },
  {
    title: "CRYPTO",
    settings: [
      {title: "Wallet", type: "screen"},
      {title: "Display Balance", type: "toggle"},
      {title: "Local Currency", type: "screen", default: "USD"},
      {title: "Crypto Display", type: "screen", default: "SOL"},
    ]
  },
  {
    title: "GAME SETTINGS",
    settings: [
      {title: "Quality", type: "screen", default: "High"},
    ]
  },
  {
    title: "ABOUT QUIP",
    settings: [
      {title: "Version", type: "none", default: "0.0.1"},
      {title: "Legal", type: "screen"},
    ]
  }
]

export default function Settings({route, navigation}: NativeStackScreenProps<ParamListBase, "settings">) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Screen style={[spacing.fill]}>
      <View style={[p('x', 6), m('b', 8)]}>
        <View style={[styles.playerBar, m('b', 4)]}>
          <Text style={typography.h5}>
            Settings
          </Text>
          <AvatarXp level={5} percentage={.05} source={require('../../../assets/AvatarTest.png')}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={[m('b', 16)]}>
          {
            settings.map((item, i) => <View key={i} style={m('b', 4)}>
              <Text style={[typography.p4, m('y', 2)]}>
                {item.title}
              </Text>
              <View style={[border.quip, {borderRadius: 16}]}>
                {
                  item.settings.map((setting, j) => <View key={j}>
                    <TouchableRipple borderless onPress={() => {}} style={[
                      p('x', 4),
                      {height: 72},
                      j === 0 ? {borderTopLeftRadius: 16, borderTopRightRadius: 16} : undefined,
                      j === (item.settings.length-1) ? {borderBottomLeftRadius: 16, borderBottomRightRadius: 16} : undefined
                    ]}>
                      <View style={[flex.row, flex.spaceBetween, flex.alignCenter, flex.fillH]}>
                        <Text style={typography.p2}>
                          {setting.title}
                        </Text>
                        {
                          (() => {
                            switch (setting.type) {
                              case "none":
                                return <Text style={[typography.p2, m('r', 2), styles.subtext]}>
                                  {setting.default}
                                </Text>
                              case "screen":
                                return <View style={[flex.row, flex.alignCenter]}>
                                  <Text style={[typography.p2, m('r', 2), styles.subtext]}>
                                    {setting.default}
                                  </Text>
                                  <View style={[{width: 40, height: 40}, flex.row, flex.center]}>
                                    <FontAwesome5 name="angle-right" size={18} color={theme.colors.p1}/>
                                  </View>
                                </View>
                              case "toggle":
                                return <View>
                                  <Switch
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                  />
                                </View>
                            }
                          })()
                        }
                      </View>
                    </TouchableRipple>
                    {
                      (j < item.settings.length-1) && <View style={styles.divider}/>
                    }
                  </View>)
                }
              </View>
            </View>)
          }
        </ScrollView>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  playerBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    borderStyle: "solid",
    borderColor: theme.colors.s3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
  },
  subtext: {
    color: theme.colors.s4,
  }
})
