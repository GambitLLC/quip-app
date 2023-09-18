const accessories = ["Cap", "Circle_Earring", "Earphone", "Earring", "Futuristic_Glasses", "Glasses", "Mask", "Mask_Google", "Moustache", "Rounded_Glasses", "Simple_Earring", "Stylish_Glasses"] as const;
type Accessory = typeof accessories[number];

const eyes = ["Angry", "Closed", "Cynic", "Normal", "Sad", "Thin"] as const;
type Eye = typeof eyes[number];

const faces = ["Darker", "Fair", "Light", "Tanned"] as const;
type Face = typeof faces[number];

//create a hair array and a Hair Type that contains the strings "01" through "23"
const hairs = ["Hair01", "Hair02", "Hair03", "Hair04", "Hair05", "Hair06", "Hair07", "Hair08", "Hair09", "Hair10", "Hair11", "Hair12", "Hair13", "Hair14", "Hair15", "Hair16", "Hair17", "Hair18", "Hair19", "Hair20", "Hair21", "Hair22", "Hair23"] as const;
type Hair = typeof hairs[number];

const mouths = ["Angry", "Cute", "Eat", "Hate", "Normal_Smile", "Normal_Thin", "Open_Mouth", "Open_Tooth", "Sad", "Smiley"] as const;
type Mouth = typeof mouths[number];

const outfits = ["Outfit01", "Outfit02", "Outfit03", "Outfit04", "Outfit05", "Outfit06", "Outfit07", "Outfit08", "Outfit09", "Outfit10", "Outfit11", "Outfit12", "Outfit13", "Outfit14", "Outfit15", "Outfit16", "Outfit17", "Outfit18", "Outfit19", "Outfit20", "Outfit21", "Outfit22", "Outfit23"] as const;
type Outfit = typeof outfits[number];

const colors = ["green", "purple", "blue"] as const
type Color = typeof colors[number]

interface AvatarProps {
  accessory?: Accessory,
  hair?: Hair,
  eye: Eye,
  face: Face,
  mouth: Mouth,
  outfit: Outfit,
  color: Color
}

export {
  accessories,
  Accessory,
  eyes,
  Eye,
  faces,
  Face,
  hairs,
  Hair,
  mouths,
  Mouth,
  outfits,
  Outfit,
  colors,
  Color,
  AvatarProps,
}