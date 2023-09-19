import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";
import {Achievement, Avatar, LevelInfo, m, p, PlayfulAvatar, Screen, spacing, Text, typography} from "@/lib";
import {theme} from "@/util/Theme"
import {ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";
import {IconButton} from "react-native-paper";
import {useAvatarStore} from "@/lib/store/AvatarStore";

function Profile({navigation}: NativeStackScreenProps<ParamListBase, "profile">) {
  const windowDim = useWindowDimensions();
  const {avatar} = useAvatarStore()

  return (
    <Screen screenStyle={[{backgroundColor: theme.colors.background}]} style={[spacing.fill]}>
      <View style={[spacing.fill, p('a', 4), {display: "flex", flexDirection: "column"}]}>
        <View style={[styles.topView, p('a', 6), p('t', 8)]}>
          <View style={[styles.topProfileHeader, m('b', 7)]}>
            <IconButton onPress={() => {
              navigation.goBack()
            }} icon={"close"}/>
            <Text style={[typography.h6]}>Profile</Text>
            <IconButton style={{opacity: 0}} icon={"close"}/>
          </View>
          <PlayfulAvatar size={112} color={avatar.color} eye={avatar.eye} face={avatar.face} mouth={avatar.mouth} accessory={avatar.accessory} hair={avatar.hair} outfit={avatar.outfit} />
          <Text style={[typography.h5, {color: theme.colors.p1}, m('t', 4), m('b', 6)]}>Username</Text>
          <LevelInfo level={10} currExp={200} totalExp={1000}/>
        </View>
        <ScrollView decelerationRate={0} showsVerticalScrollIndicator={false} style={[m('t', 6)]}>
          <Achievement color={theme.colors.p2} name="Quip!" description="Play 10 quips" progress={3} maxProgress={10} level={2}/>
          <Achievement color={theme.colors.p1} name="GG!" description="Win 5 quips" progress={1} maxProgress={5} level={2}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
          <Achievement color={"#39C0EB"} name="Sizzling!" description="Win 3 quips in a row" progress={1} maxProgress={3} level={1}/>
        </ScrollView>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  topView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.colors.s5,
    borderRadius: 16,
  },
  topProfileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
})

export default Profile
