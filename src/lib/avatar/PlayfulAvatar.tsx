import {ColorValue, View, StyleSheet, DimensionValue, ViewStyle} from "react-native";
import {Accessory, Eye, Face, Hair, Mouth, Outfit} from "./types";
import {flex} from "../styles/Flex";

import * as PlayfulAccessory from "./playful/accessories"
import * as PlayfulEye from "./playful/eyes"
import * as PlayfulFace from "./playful/face"
import * as PlayfulHair from "./playful/hair"
import * as PlayfulMouth from "./playful/mouth"
import * as PlayfulOutfit from "./playful/outfit"
import {useMemo} from "react";

interface PlayfulAvatarProps {
  size: number,
  color: ColorValue,
  accessory?: Accessory,
  eye: Eye,
  face: Face,
  hair?: Hair,
  mouth: Mouth,
  outfit?: Outfit,
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
    return pxValue
  }

  function translateP(y: number, x: number): [{ translateX: number }, { translateY: number }] {
    return [
      {
        translateX: scaleP(x/2)
      },
      {
        translateY: scaleP(y/2)
      }
    ]
  }

  const avatarComponentStyle = {
    transform: [
      {
        scale: scale
      }
    ],
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

  //// -- custom hair offsets --
  // .hair-01 {
  //   margin-top: scaleP(-22);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-02 {
  //   margin-top: scaleP(-22);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-04 {
  //   margin-top: scaleP(-36);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-06 {
  //   margin-top: scaleP(-22);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-07 {
  //   margin-top: scaleP(-18);
  //   margin-left: scaleP(-5);
  // }
  //
  // .hair-08 {
  //   margin-top: scaleP(-30);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-09 {
  //   margin-top: scaleP(-33);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-10 {
  //   margin-top: scaleP(-30);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-12 {
  //   margin-top: scaleP(-30);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-13 {
  //   margin-top: scaleP(-26);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-15 {
  //   margin-top: scaleP(-26);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-19 {
  //   margin-top: scaleP(-10);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-20 {
  //   margin-top: scaleP(20);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-22 {
  //   margin-top: scaleP(-30);
  //   margin-left: scaleP(-3);
  // }
  //
  // .hair-23 {
  //   margin-top: scaleP(-10);
  //   margin-left: scaleP(-3);
  // }

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

  //// -- custom accessory offsets --
  // .accessory-Cap {
  //   margin-top: scaleP(-36);
  //   margin-left: scaleP(12);
  // }
  //
  // .accessory-Circle_Earring {
  //   margin-top: scaleP(65);
  //   margin-left: scaleP(12);
  // }
  //
  // .accessory-Earphone {
  //   margin-top: scaleP(177);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Earring {
  //   margin-top: scaleP(64);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Futuristic_Glasses {
  //   margin-top: scaleP(35);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Glasses {
  //   margin-top: scaleP(45);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Mask {
  //   margin-top: scaleP(60);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Mask_Google {
  //   margin-top: scaleP(62);
  //   margin-left: scaleP(14);
  // }
  //
  // .accessory-Moustache {
  //   margin-top: scaleP(68);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Simple_Earring {
  //   margin-top: scaleP(64);
  //   margin-left: scaleP(18);
  // }
  //
  // .accessory-Stylish_Glasses {
  //   margin-top: scaleP(44);
  //   margin-left: scaleP(14);
  // }

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

  //// -- custom outfit offsets --
  // .outfit-01 {
  //   margin-top: scaleP(257);
  //   margin-left: scaleP(11);
  // }
  //
  // .outfit-08 {
  //   margin-top: scaleP(261);
  //   margin-left: scaleP(14);
  // }
  //
  // .outfit-12 {
  //   margin-top: scaleP(263);
  //   margin-left: scaleP(14);
  // }
  //
  // .outfit-13 {
  //   margin-top: scaleP(264);
  //   margin-left: scaleP(14);
  // }
  //
  // .outfit-14 {
  //   margin-top: scaleP(264);
  //   margin-left: scaleP(10);
  // }
  //
  // .outfit-15 {
  //   margin-top: scaleP(283);
  //   margin-left: scaleP(16);
  // }
  //
  // .outfit-20 {
  //   margin-top: scaleP(263);
  //   margin-left: scaleP(15);
  // }

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
      {
        props.outfit && <View style={[
          avatarComponentStyle,
          outfitStyle,
          // @ts-ignore
          outfits[props.outfit]
        ]}>
          <Outfit/>
        </View>
      }
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