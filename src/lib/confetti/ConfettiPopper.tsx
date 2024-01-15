// -- Confetti constants --
import {runOnJS, SharedValue, useDerivedValue, useFrameCallback, useSharedValue} from "react-native-reanimated";
import {useWindowDimensions, View} from "react-native";
import {Canvas, Path, Skia, SkPath} from "@shopify/react-native-skia";
import {useMemo} from "react";
import {random, range} from "@/util/ArrayUtil";
import {spacing} from "../styles/Spacing";

const NUM_CONFETTI = 350

const CONFETTI_COLORS = [
  "#55476a",
  "#ae3d63",
  "#db3853",
  "#f45c44",
  "#f8b646",
]

const CONFETTI_SHAPES = [
  'confettiCircle',
  'confettiHeart',
  'confettiSquiggle',
  'confettiX',
  'confettiDollar'
] as const

type ConfettiShape = typeof CONFETTI_SHAPES[number]

// -- DOP --
const DOP = 0.0125
const DOP_MAX = 4
const DOP_MIN = 1

// -- SIZE --
const SIZE_MAX = 6
const SIZE_MIN = 2

// -- VELOCITY --
const VX = 1
const VY = 1

// -- Types --
interface ConfettiPieceProps {
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
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

function drawPath(shape: ConfettiShape, path: SkPath, x: number, y: number, r: number) {
  'worklet'

  path.rewind()

  switch (shape) {
    case 'confettiCircle':
      path.addCircle(x, y, r)
      path.close()
      break;
    case 'confettiHeart':
      r = r * 0.75
      path.moveTo(x + 2*r, y)
      path.rCubicTo(-0.3651 * r, 0.702 * r, -1.3415 * r, 1.6567 * r, -1.8938 * r, 2.1654 * r)
      path.rArcTo(0.1561 * r, 0.1561 * r, 90, true, true, -0.209 * r, 0)
      path.rCubicTo(-0.5553 * r, -0.5085 * r, -1.5319 * r, -1.4633 * r, -1.897 * r, -2.1654 * r)
      path.rCubicTo(-0.8019 * r, -1.5444 * r, 1.2199 * r, -2.574 * r, 2 * r, -1.0295 * r)
      path.rCubicTo(0.7801 * r, -1.5444 * r, 2.8018 * r, -0.5148 * r, 2 * r, 1.0295 * r)
      path.close()
      break;
    case 'confettiSquiggle':
      path.moveTo(x - r, y + r)
      path.cubicTo(x - r, y - r, x + r, y + r, x + r, y - r)
      path.close()
      break;
    case 'confettiX':
      path.moveTo(x - r, y - r)
      path.lineTo(x + r, y + r)
      path.moveTo(x - r, y + r)
      path.lineTo(x + r, y - r)
      path.close()
      break;
    case 'confettiDollar':
      path.moveTo(x, y)
      path.rMoveTo(0.5094 * r, -0.1766 * r)
      path.rLineTo(-0.8438 * r, -0.2469 * r)
      path.rCubicTo(-0.0977  * r, -0.0281 * r, -0.1656 * r, -0.1195 * r, -0.1656 * r, -0.2211 * r)
      path.rCubicTo(0, -0.1273 * r, 0.1031 * r, -0.2305 * r, 0.2305 * r, -0.2305 * r)
      path.rLineTo(0.518 * r, 0) //Horizontal line
      path.rCubicTo(0.0953 * r, 0, 0.1891 * r, 0.0289 * r, 0.2672 * r, 0.082 * r)
      path.rCubicTo(0.0477 * r, 0.032 * r, 0.1117 * r, 0.0242 * r, 0.1523 * r, -0.0156 * r)
      path.rLineTo(0.2719 * r, -0.2656 * r)
      path.rCubicTo(0.0555 * r, -0.0539 * r, 0.0477 * r, -0.1437 * r, -0.0141 * r, -0.1914 * r)
      path.rCubicTo(-0.1914 * r, -0.15 * r, -0.4305 * r, -0.2336 * r, -0.6758 * r, -0.2344 * r)
      path.rLineTo(0, -0.375 * r) //Vertical line
      path.rCubicTo(0, -0.0688 * r, -0.0563 * r, -0.125 * r, -0.125 * r, -0.125 * r)
      path.rLineTo(-0.25 * r, 0) //Horizontal line
      path.rCubicTo(-0.0688 * r, 0, -0.125 * r, 0.0563 * r, -0.125 * r, 0.125 * r)
      path.rLineTo(0, 0.375 * r) //Vertical line
      path.rLineTo(-0.0195 * r, 0) //Horizontal line
      path.rCubicTo(-0.4977 * r, 0, -0.8977 * r, 0.4273 * r, -0.8516 * r, 0.9344 * r)
      path.rCubicTo(0.0328 * r, 0.3602 * r, 0.3078 * r, 0.6531 * r, 0.6547 * r, 0.7547 * r)
      path.rLineTo(0.8008 * r, 0.2344 * r)
      path.rCubicTo(0.0977 * r, 0.0289 * r, 0.1656 * r, 0.1195 * r, 0.1656 * r, 0.2211 * r)
      path.rCubicTo(0, 0.1273 * r, -0.1031 * r, 0.2305 * r, -0.2305 * r, 0.2305 * r)
      path.rLineTo(-0.518 * r, 0) //Horizontal line
      path.rCubicTo(-0.0953 * r, 0, -0.1891 * r, -0.0289 * r, -0.2672 * r, -0.082 * r)
      path.rCubicTo(-0.0477 * r, -0.032 * r, -0.1117 * r, -0.0242 * r, -0.1523 * r, 0.0156 * r)
      path.rLineTo(-0.2719 * r, 0.2656 * r)
      path.rCubicTo(-0.0555 * r, 0.0539 * r, -0.0477 * r, 0.1437 * r, 0.0141 * r, 0.1914 * r)
      path.rCubicTo(0.1914 * r, 0.15 * r, 0.4305 * r, 0.2336 * r, 0.6758 * r, 0.2344 * r)
      path.rLineTo(0, 0.375 * r) //Vertical line
      path.rCubicTo(0, 0.0688 * r, 0.0563 * r, 0.125 * r, 0.125 * r, 0.125 * r)
      path.rLineTo(0.25 * r, 0) //Horizontal line
      path.rCubicTo(0.0688 * r, 0, 0.125 * r, -0.0563 * r, 0.125 * r, -0.125 * r)
      path.rLineTo(0, -0.3766 * r) //Vertical line
      path.rCubicTo(0.3641 * r, -0.007 * r, 0.7055 * r, -0.2234 * r, 0.8258 * r, -0.568 * r)
      path.rCubicTo(0.168 * r, -0.4813 * r, -0.1141 * r, -0.975 * r, -0.5664 * r, -1.107 * r)
      path.close()
      break;
  }
}

function ConfettiPiece(props: ConfettiPieceProps & ConfettiPieceMetaProps) {
  const isFirstRun = useSharedValue(true)

  const {width, height} = useWindowDimensions()

  const x = useSharedValue(props.x)
  const y = useSharedValue(props.y)
  const vx = useSharedValue(props.vx)
  const vy = useSharedValue(props.vy)
  const opacity = useSharedValue(props.opacity)
  const dop = useSharedValue(props.dop)
  const yMax = useSharedValue(props.yMax)
  const xMax = useSharedValue(props.xMax)

  const Y_RANGE = height

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
      x.value = Math.random() * width - 2*props.size
      y.value = (Y_RANGE * Math.random() - Y_RANGE)
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
    if (dop.value > 0) {
      dop.value *= -1
    }

    x.value += vx.value
    y.value += vy.value
    opacity.value -= Math.abs(dop.value)

    if (opacity.value < 0) {
      //replace (reset)
      opacity.value = -1
      dop.value = DOP * (Math.random() * (DOP_MAX-DOP_MIN) + DOP_MIN)
      x.value = (Math.random() * width - 2*props.size)
      y.value = (Y_RANGE * Math.random() - Y_RANGE)
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

  const path = useSharedValue(Skia.Path.Make())

  useDerivedValue(() => {
    drawPath(props.shape, path.value, x.value, y.value, props.size)
  })

  switch (props.shape) {
    case 'confettiCircle':
      return <Path path={path} color={props.color} opacity={opacity} />
    case 'confettiHeart':
      return <Path path={path} color={props.color} opacity={opacity} />
    case 'confettiDollar':
      return <Path path={path} color={props.color} opacity={opacity} />
    case 'confettiSquiggle':
      return <Path
        path={path}
        color={props.color}
        style='stroke'
        opacity={opacity}
        strokeWidth={props.size}
        strokeCap="round"
        strokeJoin="round"
      />
    case 'confettiX':
      return <Path
        path={path}
        color={props.color}
        style='stroke'
        opacity={opacity}
        strokeWidth={props.size}
        strokeCap="round"
        strokeJoin="round"
      />
  }
}

interface ConfettiCannonProps {
  shapes?: ConfettiShape[]
  colors?: string[]
  amount?: number
}

function ConfettiCannon(props: ConfettiCannonProps & ConfettiPieceMetaProps) {
  const {width, height} = useWindowDimensions()

  const Y_RANGE = height

  const confetti = useMemo<ConfettiPieceProps[]>(() => Array(props.amount ?? NUM_CONFETTI).fill(0).map(() => {
    const size = ~~range(SIZE_MIN, SIZE_MAX)

    return {
      size,
      opacity: -1,
      dop: DOP * range(DOP_MIN, DOP_MAX),
      x: range(-2*size, width - 2*size),
      y: range(-Y_RANGE, 0),
      xMax: width - size,
      yMax: height - size,
      vx: VX * (range(0, 2) + 8 * 0.5 - 5),
      vy: VY * (0.7 * size + range(-1, 1)),
      color: random(props.colors ?? CONFETTI_COLORS),
      shape: random(props.shapes ?? CONFETTI_SHAPES) as ConfettiShape,
    }
  }), [props.amount, props.colors, props.shapes])

  return <View pointerEvents={"none"} style={[spacing.fill, {position: 'absolute'}]}>
    <Canvas pointerEvents={"none"} style={[spacing.fill, {backgroundColor: 'transparent'}]}>
      {confetti.map((c, i) => {
        return <ConfettiPiece {...c} key={i} raining={props.raining} />
      })}
    </Canvas>
  </View>
}

export function ConfettiPopper(props?: ConfettiCannonProps) {
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