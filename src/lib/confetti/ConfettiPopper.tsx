
// -- Confetti constants --
import {runOnJS, SharedValue, useDerivedValue, useFrameCallback, useSharedValue} from "react-native-reanimated";
import {useWindowDimensions, View} from "react-native";
import {Canvas, Circle, Rect, Path, Skia, SkPath, Offset, Group} from "@shopify/react-native-skia";
import {useMemo} from "react";
import {random, range} from "@/util/ArrayUtil";
import {spacing} from "../styles/Spacing";
import {ConfettiHeart, ConfettiSquiggle, ConfettiX, ConfettiCircle, ConfettiStar} from "./Shapes";

const NUM_CONFETTI = 350

const CONFETTI_COLORS = [
  "#55476a",
  "#ae3d63",
  "#db3853",
  "#f45c44",
  "#f8b646",
] as const

type ConfettiColor = typeof CONFETTI_COLORS[number]

const CONFETTI_SHAPES = [
  'confettiCircle',
  'confettiHeart',
  'confettiStar',
  'confettiSquiggle',
  'confettiX'
] as const

type ConfettiShape = typeof CONFETTI_SHAPES[number]

// -- DOP --
const DOP = 0.0085
const DOP_MAX = 4
const DOP_MIN = 1

// -- SIZE --
const SIZE_MAX = 6
const SIZE_MIN = 2

// -- OFFSET --
const X_OFFSET = 0
const Y_OFFSET_A = 50
const Y_RANGE_P = 0.1

// -- VELOCITY --
const VX = 1
const VY = 1

// -- Types --
interface ConfettiPieceProps {
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: ConfettiColor,
  shape: ConfettiShape,
  size: number,
  opacity: number,
  xMax: number,
  yMax: number,
  dop: number,
}

interface ConfettiPieceMetaProps {
  raining: SharedValue<boolean>,
}

function ConfettiPiece(props: ConfettiPieceProps & ConfettiPieceMetaProps) {
  const isFirstRun = useSharedValue(true)

  const {width, height} = useWindowDimensions()

  const rotation = useSharedValue(0)

  const x = useSharedValue(props.x)
  const y = useSharedValue(props.y)
  const vx = useSharedValue(props.vx)
  const vy = useSharedValue(props.vy)
  const opacity = useSharedValue(props.opacity)
  const dop = useSharedValue(props.dop)
  const yMax = useSharedValue(props.yMax)
  const xMax = useSharedValue(props.xMax)

  const Y_RANGE = Y_RANGE_P * height
  const Y_OFFSET = -Y_RANGE_P * height + Y_OFFSET_A

  const rainCallback = useFrameCallback(() => {
    x.value += vx.value
    y.value += vy.value

    if (y.value > 0) {
      opacity.value += dop.value
    }

    if (opacity.value > 1) {
      opacity.value = 1
      dop.value *= -1
    }
    if (opacity.value < 0 || y.value > yMax.value) {
      //replace (reset)
      opacity.value = 1
      dop.value = DOP * (Math.random() * (DOP_MAX-DOP_MIN) + DOP_MIN)
      x.value = (Math.random() * width - 2*props.size) + X_OFFSET
      y.value = (Y_RANGE * Math.random() - Y_RANGE) + Y_OFFSET
      yMax.value = height - props.size
      xMax.value = width - props.size
      vx.value = VX * (Math.random()*2 + 8 * 0.5 - 5)
      vy.value = VY * (0.7 * props.size + (2 * Math.random() - 1))
    }
    if (!(0 < x.value && x.value < xMax.value)) {
      x.value = (x.value + xMax.value) % xMax.value
    }
  }, false)

  const cb = () => {
    deathCallback.setActive(false)
  }

  const deathCallback = useFrameCallback(() => {
    x.value += vx.value
    y.value += vy.value
    opacity.value -= Math.abs(dop.value)

    if (opacity.value < 0) {
      //replace (reset)
      opacity.value = -1
      dop.value = DOP * (Math.random() * (DOP_MAX-DOP_MIN) + DOP_MIN)
      x.value = (Math.random() * width - 2*props.size) + X_OFFSET
      y.value = (Y_RANGE * Math.random() - Y_RANGE) + Y_OFFSET
      yMax.value = height - props.size
      xMax.value = width - props.size
      vx.value = VX * (Math.random()*2 + 8 * 0.5 - 5)
      vy.value = VY * (0.7 * props.size + (2 * Math.random() - 1))

      runOnJS(cb)()
    }
  }, false)

  useDerivedValue(() => {
    if (isFirstRun.value) {
      isFirstRun.value = false
      runOnJS(rainCallback.setActive)(props.raining.value)
    } else {
      runOnJS(rainCallback.setActive)(props.raining.value)
      runOnJS(deathCallback.setActive)(!props.raining.value)
    }
  })

  //const path = useSharedValue(Skia.Path.Make())

  // function drawPath(shape: ConfettiShape, path: SkPath, x: number, y: number, r: number) {
  //   'worklet'
  //
  //   const size = r * 2
  //
  //   path.rewind()
  //
  //   //update the path origin
  //   path.moveTo(x, y)
  //
  //   switch (shape) {
  //     case 'confettiCircle':
  //       //circle path is handled by the Circle component
  //       break;
  //     case 'confettiHeart':
  //       //draw a heart path with the origin at the top left corner and size*2 as the width and height
  //       path.rMoveTo(4.0355, 0)
  //       path.rCubicTo(-2.2288, 0, -4.0355, 1.8068, -4.0355, 4.0355)
  //       path.rCubicTo(0, 1.0703, 0.4252, 2.0968, 1.182, 2.8536)
  //       path.rLineTo(5.9645, 5.9645)
  //       path.rCubicTo(0.1953, 0.1952, 0.5118, 0.1952, 0.7071, 0)
  //       path.rLineTo(5.9644, -5.9645)
  //       path.rCubicTo(0.7568, -0.7568, 1.182, -1.7833, 1.182, -2.8536)
  //       path.rCubicTo(0, -2.2288, -1.8068, -4.0355, -4.0355, -4.0355)
  //       path.rCubicTo(-1.0703, 0, -2.0968, 0.4252, -2.8536, 1.182)
  //       path.rLineTo(-0.6109, 0.6109)
  //       path.rLineTo(-0.6109, -0.6109)
  //       path.rCubicTo(-0.7568, -0.7568, -1.7833, -1.182, -2.8536, -1.182)
  //       path.close()
  //       break;
  //     case 'confettiStar':
  //       //draw a star path with the origin at the top left corner and size*2 as the width and height
  //       path.lineTo(x + size, y)
  //       path.lineTo(x + size, y + size)
  //       path.lineTo(x, y + size)
  //       path.close()
  //       break;
  //     case 'confettiSquiggle':
  //       //draw a squiggle path with the origin at the top left corner and size*2 as the width and height
  //       path.lineTo(x + size, y)
  //       path.lineTo(x + size, y + size)
  //       path.lineTo(x, y + size)
  //       path.close()
  //       break;
  //   }
  // }
  //
  // useDerivedValue(() => {
  //   drawPath(props.shape, path.value, x.value, y.value, props.size)
  // })

  switch (props.shape) {
    case 'confettiCircle':
      return <ConfettiCircle x={x} y={y} size={props.size} color={props.color} opacity={opacity} rotation={rotation}/>
    case 'confettiHeart':
      return <ConfettiHeart x={x} y={y} size={props.size} color={props.color} opacity={opacity} rotation={rotation}/>
    case 'confettiStar':
      return <ConfettiStar x={x} y={y} size={props.size} color={props.color} opacity={opacity} rotation={rotation}/>
    case 'confettiSquiggle':
      return <ConfettiSquiggle x={x} y={y} size={props.size} color={props.color} opacity={opacity} rotation={rotation}/>
    case "confettiX":
      return <ConfettiX x={x} y={y} size={props.size} color={props.color} opacity={opacity} rotation={rotation}/>
  }
}

interface ConfettiCannonProps {

}

function ConfettiCannon(props: ConfettiCannonProps & ConfettiPieceMetaProps) {
  const {width, height} = useWindowDimensions()

  const Y_RANGE = Y_RANGE_P * height
  const Y_OFFSET = -Y_RANGE_P * height + Y_OFFSET_A

  const confetti = useMemo<ConfettiPieceProps[]>(() => Array(NUM_CONFETTI).fill(0).map(() => {
    const size = ~~range(SIZE_MIN, SIZE_MAX)

    return {
      size,
      opacity: -1,
      dop: DOP * range(DOP_MIN, DOP_MAX),
      x: range(-2*size, width - 2*size) + X_OFFSET,
      y: range(-Y_RANGE, 0) + Y_OFFSET,
      xMax: width - size,
      yMax: height - size,
      vx: VX * (range(0, 2) + 8 * 0.5 - 5),
      vy: VY * (0.7 * size + range(-1, 1)),
      color: random(CONFETTI_COLORS) as ConfettiColor,
      shape: random(CONFETTI_SHAPES) as ConfettiShape,
    }
  }), [])

  return <View pointerEvents={"none"} style={[spacing.fill, {position: 'absolute'}]}>
    <Canvas pointerEvents={"none"} style={[spacing.fill, {backgroundColor: 'transparent'}]}>
      {confetti.map((c, i) => {
        return <ConfettiPiece {...c} key={i} raining={props.raining} />
      })}
    </Canvas>
  </View>
}

export function ConfettiPopper(props: ConfettiCannonProps) {
  const isRaining = useSharedValue(false)
  return [
    () => {
      return <ConfettiCannon {...props} raining={isRaining} />
    },
    (ms: number | boolean) => {
      if (typeof ms === "boolean") {
        isRaining.value = !isRaining.value
        return
      } else {
        if (isRaining.value) return
        isRaining.value = true
        setTimeout(() => {
          isRaining.value = false
        }, ms)
      }
    }
  ] as const
}

export default ConfettiPopper