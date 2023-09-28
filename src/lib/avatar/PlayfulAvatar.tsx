import {ColorValue, View, StyleSheet, ViewStyle} from "react-native";
import {Accessory, Eye, Face, Hair, Mouth, Outfit} from "./types";
import {flex} from "../styles/Flex";

import * as PlayfulAccessory from "./playful/accessories"
import * as PlayfulEye from "./playful/eyes"
import * as PlayfulFace from "./playful/face"
import * as PlayfulHair from "./playful/hair"
import * as PlayfulMouth from "./playful/mouth"
import * as PlayfulOutfit from "./playful/outfit"
import {useMemo} from "react";

export interface PlayfulAvatarProps {
  size: number,
  color: ColorValue,
  accessory?: Accessory,
  eye: Eye,
  face: Face,
  hair?: Hair,
  mouth: Mouth,
  outfit: Outfit,
}

export function PlayfulAvatar(props: PlayfulAvatarProps) {
  const Accessory = useMemo(() => {
    // @ts-ignore
    return PlayfulAccessory[props.accessory].default
  }, [props.accessory])

  const Eye = useMemo(() => {
    // @ts-ignore
    return PlayfulEye[props.eye].default
  }, [props.eye])

  const Face = useMemo(() => {
    // @ts-ignore
    return PlayfulFace[props.face].default
  }, [props.face])

  const Hair = useMemo(() => {
    // @ts-ignore
    return PlayfulHair[props.hair].default
  } , [props.hair])

  const Mouth = useMemo(() => {
    // @ts-ignore
    return PlayfulMouth[props.mouth].default
  }, [props.mouth])

  const Outfit = useMemo(() => {
    // @ts-ignore
    return PlayfulOutfit[props.outfit].default
  }, [props.outfit])

  const scale = props.size / 295

  function scaleP(pxValue: number): number {
    return pxValue * scale
  }

  function translateP(y: number, x: number): [{ translateX: number }, { translateY: number }, {scale: number}] {
    return [
      {
        translateX: scaleP(x/2)
      },
      {
        translateY: scaleP(y/2)
      },
      {
        scale: scale
      }
    ]
  }

  const avatarComponentStyle = {
    position: 'absolute',
  } as ViewStyle

  const acessoryStyle = {
    zIndex: 3,
    transform: translateP(35, 22),
  } as ViewStyle

  const eyeStyle = {
    zIndex: 1,
    transform: translateP(-45, 63),
  } as ViewStyle

  const faceStyle = {
    transform: translateP(55, -25),
  } as ViewStyle

  const hairStyle = {
    zIndex: 2,
    transform: translateP(-18, -3),
  } as ViewStyle

  const mouthStyle = {
    zIndex: 1,
    transform: translateP(68, 50),
  } as ViewStyle

  const outfitStyle= {
    zIndex: 1,
    transform: translateP(263, 15),
  } as ViewStyle

  const hairs = {
    "Hair01": {
      transform: translateP(-22, -3),
    } as ViewStyle,
    "Hair02": {
      transform: translateP(-22, -3),
    } as ViewStyle,
    "Hair04": {
      transform: translateP(-36, -3),
    } as ViewStyle,
    "Hair06": {
      transform: translateP(-22, -3),
    } as ViewStyle,
    "Hair07": {
      transform: translateP(-18, -5),
    } as ViewStyle,
    "Hair08": {
      transform: translateP(-30, -3),
    } as ViewStyle,
    "Hair09": {
      transform: translateP(-33, -3),
    } as ViewStyle,
    "Hair10": {
      transform: translateP(-30, -3),
    } as ViewStyle,
    "Hair12": {
      transform: translateP(-30, -3),
    } as ViewStyle,
    "Hair13": {
      transform: translateP(-26, -3),
    } as ViewStyle,
    "Hair15": {
      transform: translateP(-26, -3),
    } as ViewStyle,
    "Hair19": {
      transform: translateP(-10, -3),
    } as ViewStyle,
    "Hair20": {
      transform: translateP(20, -3),
    } as ViewStyle,
    "Hair22": {
      transform: translateP(-30, -3),
    } as ViewStyle,
    "Hair23": {
      transform: translateP(-10, -3),
    } as ViewStyle,
  }

  const accessories = {
    "Cap": {
      transform: translateP(-36, 12),
    } as ViewStyle,
    "Circle_Earring": {
      transform: translateP(65, 12),
    } as ViewStyle,
    "Earphone": {
      transform: translateP(177, 18),
    } as ViewStyle,
    "Earring": {
      transform: translateP(64, 18),
    } as ViewStyle,
    "Futuristic_Glasses": {
      transform: translateP( 35, 18),
    } as ViewStyle,
    "Glasses": {
      transform: translateP(45, 18),
    } as ViewStyle,
    "Mask": {
      transform: translateP(60, 18),
    } as ViewStyle,
    "Mask_Google": {
      transform: translateP(62, 14),
    } as ViewStyle,
    "Moustache": {
      transform: translateP(68, 18),
    } as ViewStyle,
    "Simple_Earring": {
      transform: translateP( 64, 18),
    } as ViewStyle,
    "Stylish_Glasses": {
      transform: translateP( 44, 14),
    } as ViewStyle,
  }

  const outfits = {
    "Outfit01": {
      transform: translateP(257, 11),
    } as ViewStyle,
    "Outfit08": {
      transform: translateP(261, 14),
    } as ViewStyle,
    "Outfit12": {
      transform: translateP(263, 14),
    } as ViewStyle,
    "Outfit13": {
      transform: translateP(264, 14),
    } as ViewStyle,
    "Outfit14": {
      transform: translateP(264, 10),
    } as ViewStyle,
    "Outfit15": {
      transform: translateP(283, 16),
    } as ViewStyle,
    "Outfit20": {
      transform: translateP(263, 15),
    } as ViewStyle,
  }

  return (
    <View style={[{
      width: props.size,
      height: props.size,
      backgroundColor: props.color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }, styles.avatar]}>
      {
        props.accessory && <View style={[
          avatarComponentStyle,
          acessoryStyle,
          // @ts-ignore
          accessories[props.accessory]
        ]}>
          <Accessory/>
        </View>
      }
      <View style={[avatarComponentStyle, eyeStyle]}>
        <Eye/>
      </View>
      <View style={[avatarComponentStyle, faceStyle]}>
        <Face/>
      </View>
      {
        props.hair && <View style={[
          avatarComponentStyle,
          hairStyle,
          // @ts-ignore
          hairs[props.hair]
        ]}>
          <Hair/>
        </View>
      }
      <View style={[avatarComponentStyle, mouthStyle]}>
        <Mouth/>
      </View>
      <View style={[
        avatarComponentStyle,
        outfitStyle,
        // @ts-ignore
        outfits[props.outfit]
      ]}>
        <Outfit/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
    borderRadius: 9999,
    overflow: 'hidden',
  },
})