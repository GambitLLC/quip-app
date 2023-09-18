import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PlayfulAvatar, Screen, spacing, Selector} from "@/lib";
import {ParamListBase} from "@react-navigation/native";
import {useState} from "react";
import {Accessory, Eye, Face, Hair, Mouth, Outfit, accessories, eyes, faces, hairs, mouths, outfits} from "@/lib/avatar/types";

export default function Settings({route, navigation}: NativeStackScreenProps<ParamListBase, "settings">) {
  const [eye, setEye] = useState<Eye>("Angry")
  const [face, setFace] = useState<Face>("Darker")
  const [mouth, setMouth] = useState<Mouth>("Angry")
  const [accessory, setAccessory] = useState<Accessory>("Cap")
  const [hair, setHair] = useState<Hair>("Hair01")
  const [outfit, setOutfit] = useState<Outfit>("Outfit01")

  return (
    <Screen style={[spacing.fill, spacing.center]}>
      <PlayfulAvatar size={295} color={"#1d1d1d"} eye={eye} face={face} mouth={mouth} accessory={accessory} hair={hair} outfit={outfit}/>
      <Selector items={eyes} onLeft={(item) => {
        setEye(item)
      }} onRight={(item) => {
        setEye(item)
      }} />
      <Selector items={faces} onLeft={(item) => {
        setFace(item)
      }} onRight={(item) => {
        setFace(item)
      }} />
      <Selector items={mouths} onLeft={(item) => {
        setMouth(item)
      }} onRight={(item) => {
        setMouth(item)
      }} />
      <Selector items={accessories} onLeft={(item) => {
        setAccessory(item)
      }} onRight={(item) => {
        setAccessory(item)
      }} />
      <Selector items={hairs} onLeft={(item) => {
        setHair(item)
      }} onRight={(item) => {
        setHair(item)
      }} />
      <Selector items={outfits} onLeft={(item) => {
        setOutfit(item)
      }} onRight={(item) => {
        setOutfit(item)
      }} />
    </Screen>
  )
}
