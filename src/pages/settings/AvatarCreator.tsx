import {View, StyleSheet} from "react-native";
import {spacing, Text, Screen, PlayfulAvatar, flex, Selector, m} from "@/lib";
import {AvatarCreatorProps} from "@/pages/settings/Settings";
import {useAvatarStore} from "@/lib/store/AvatarStore";
import {accessories, eyes, faces, hairs, mouths, outfits} from "@/lib/avatar/types";

export function AvatarCreator({route, navigation}: AvatarCreatorProps) {
  const {
    avatar,
    setEyes,
    setFace,
    setMouth,
    setAccessory,
    setHair,
    setOutfit
  } = useAvatarStore()

  return (
    <Screen hasSafeArea={false} style={[spacing.fill]}>
      <View style={[flex.fill, flex.col, flex.center]}>
        <Text style={[m('b', 10)]}>Customize your avatar</Text>
        <PlayfulAvatar
          size={220}
          color={avatar.color}
          eye={avatar.eye}
          face={avatar.face}
          mouth={avatar.mouth}
          outfit={avatar.outfit}
          accessory={avatar.accessory}
          hair={avatar.hair}
        />
        <View style={[m('t', 8)]}>
          <Selector initialItem={avatar.eye} onLeft={(item) => {
            setEyes(item)
          }} onRight={(item) => {
            setEyes(item)
          }} items={eyes}/>
          <Selector initialItem={avatar.face} onLeft={(item) => {
            setFace(item)
          }} onRight={(item) => {
            setFace(item)
          }} items={faces}/>
          <Selector initialItem={avatar.mouth} onLeft={(item) => {
            setMouth(item)
          }} onRight={(item) => {
            setMouth(item)
          }} items={mouths}/>
          <Selector initialItem={avatar.accessory} onLeft={(item) => {
            setAccessory(item)
          }} onRight={(item) => {
            setAccessory(item)
          }} items={accessories}/>
          <Selector initialItem={avatar.hair} onLeft={(item) => {
            setHair(item)
          }} onRight={(item) => {
            setHair(item)
          }} items={hairs}/>
          <Selector initialItem={avatar.outfit} onLeft={(item) => {
            setOutfit(item)
          }} onRight={(item) => {
            setOutfit(item)
          }} items={outfits}/>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default AvatarCreator