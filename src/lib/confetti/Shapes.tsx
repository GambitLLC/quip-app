import {SharedValue, useDerivedValue} from "react-native-reanimated";
import {useMemo} from "react";
import {Circle, Group, Path, Skia} from "@shopify/react-native-skia";

interface ConfettiShapeProps {
  x: SharedValue<number>
  y: SharedValue<number>
  size: number
  color: string
  opacity: SharedValue<number>
  rotation: SharedValue<number>
}

interface ConfettiShapePropsMeta {
  path: string
  style?: 'stroke' | 'fill'
  strokeWidth?: number
  strokeCap?: 'round' | 'square' | 'butt'
  strokeJoin?: 'round' | 'bevel' | 'miter'
}

// -- SVG Paths --
const HEART_PATH = "m 1.2019 -0.0938 c -0.2194 0.4219 -0.8062 0.9956 -1.1381 1.3013 a 0.0938 0.0938 90 0 1 -0.1256 0 c -0.3337 -0.3056 -0.9206 -0.8794 -1.14 -1.3013 c -0.4819 -0.9281 0.7331 -1.5469 1.2019 -0.6187 c 0.4688 -0.9281 1.6838 -0.3094 1.2019 0.6187 z"
const STAR_PATH = "m 0.084 -1.3789 a 0.0938 0.0938 90 0 0 -0.168 0 l -0.3838 0.7776 l -0.8582 0.1247 a 0.0938 0.0938 90 0 0 -0.0519 0.1599 l 0.621 0.6053 l -0.1466 0.8548 a 0.0938 0.0938 90 0 0 0.1359 0.0988 l 0.7676 -0.4037 l 0.7676 0.4037 a 0.0938 0.0938 90 0 0 0.1359 -0.0988 l -0.1466 -0.855 l 0.621 -0.6051 a 0.0938 0.0938 90 0 0 -0.0519 -0.1599 l -0.8582 -0.1247 l -0.3838 -0.7774 z"
const SQUIGGLE_PATH = "m -1 1 c 0 -2 2 0 2 -2 z"
const X_PATH = "M -1 1 L 1 -1 M -1 -1 L 1 1 Z"

function usePath(path: string) {
  return useMemo(() => Skia.Path.MakeFromSVGString(path)!, [])
}

function useTransform(props: ConfettiShapeProps) {
  return [
    useDerivedValue(() => [
      {translateX: props.x.value},
      {translateY: props.y.value},
    ]),
    useDerivedValue(() => [
      {rotate: props.rotation.value},
      {scale: props.size},
    ]),
  ] as const
}

function ConfettiShape(props: ConfettiShapeProps & ConfettiShapePropsMeta) {
  const path = usePath(props.path)
  const [outerTransform, innerTransform] = useTransform(props)

  return <Group transform={outerTransform}>
    <Group transform={innerTransform}>
      <Path
        path={path}
        color={props.color}
        style={props.style}
        strokeWidth={props.strokeWidth}
        strokeCap={props.strokeCap}
        strokeJoin={props.strokeJoin}
        opacity={props.opacity}
      />
    </Group>
  </Group>
}

export function ConfettiCircle(props: ConfettiShapeProps) {
  return <Circle
    cx={props.x}
    cy={props.y}
    r={props.size}
    color={props.color}
    opacity={props.opacity}
  />
}

export function ConfettiHeart(props: ConfettiShapeProps) {
  return <ConfettiShape {...props} path={HEART_PATH} />
}

export function ConfettiStar(props: ConfettiShapeProps) {
  return <ConfettiShape {...props} path={STAR_PATH} />
}

export function ConfettiSquiggle(props: ConfettiShapeProps) {
  return <ConfettiShape
    {...props}
    path={SQUIGGLE_PATH}
    style="stroke"
    strokeWidth={1}
    strokeCap="round"
    strokeJoin="round"
  />
}

export function ConfettiX(props: ConfettiShapeProps) {
  return <ConfettiShape
    {...props}
    path={X_PATH}
    style="stroke"
    strokeWidth={1}
    strokeCap="round"
    strokeJoin="round"
  />
}