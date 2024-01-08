import { Screen, Text, spacing, ButtonClick} from "@/lib"
import {theme} from "@/util/Theme"
import { View, useWindowDimensions } from "react-native"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";

import { Canvas, Circle, Rect, Offset, Shadow } from "@shopify/react-native-skia";
import {runOnJS, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {ReactNode, useEffect, useState} from "react";

const AMT = 150;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5']
const SHAPES = ['circle', 'square']
const CONFETTI_SIZE = 16

interface ConfettiPieceProps {
    color: string,
    shape: 'circle' | 'square',
    x: number,
    y: number,
    children?: ReactNode,
}

function ConfettiPiece(props: ConfettiPieceProps) {
    if (props.shape === 'circle') {
        return <Circle cx={props.x} cy={props.y} r={CONFETTI_SIZE/2} color={props.color}>
            <Shadow dx={4} dy={4} blur={6} color="#93b8c4" />
            {props.children}
        </Circle>
    } else {
        return <Rect x={props.x} y={props.y} width={CONFETTI_SIZE} height={CONFETTI_SIZE} color={props.color}>
            <Shadow dx={4} dy={4} blur={6} color="#93b8c4" />
            {props.children}
        </Rect>
    }
}

interface ConfettiProps {
    onFinished: () => void,
}

function Confetti(props: ConfettiProps) {
    const {width, height} = useWindowDimensions()

    const pieces = Array(AMT).fill(0).map((_, i) => ({
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length] as 'circle' | 'square',
        x: Math.random() * width,
        y: (Math.random() * height*2) - (height*2) - 50,
        key: i,
    }))

    const wiggles = Array(AMT).fill(0).map((_, i) => (useSharedValue(0)))

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(height*4, {
            duration: 3000,
        }, (done) => {
            if (done) {
                runOnJS(props.onFinished)()
            }
        })

        wiggles.forEach((wiggle, i) => {
            wiggle.value = withRepeat(withTiming(Math.random() * 25 * Math.PI, {
                duration: 500 + Math.random() * 2000,
            }), -1, true)
        })
    }, [])

    return <Canvas style={{ width: "100%", height: "100%" }}>
        {pieces.map((piece) =>
          <ConfettiPiece color={piece.color} shape={piece.shape} x={piece.x} y={piece.y} key={piece.key}>
              <Offset x={wiggles[piece.key]} y={progress}/>
          </ConfettiPiece>
        )}
    </Canvas>
}

function Test({navigation}: NativeStackScreenProps<ParamListBase, "test">) {
    const [ongoing, setOngoing] = useState([])

    return (
      <Screen screenStyle={[{backgroundColor: theme.colors.background}]} style={[spacing.fill]}>
        <View style={[spacing.fill, {position: "absolute"}]}>
            {
                ongoing.map((c, i) => c)
            }
        </View>
        <ButtonClick onPress={() => {
          setOngoing((c) => [...c, <Confetti key={} onFinished={() => {
              setOngoing((c) => c.slice(1))
          }} />])
        }}>
          <Text>Confetti!</Text>
        </ButtonClick>
      </Screen>
    )
}

export default Test