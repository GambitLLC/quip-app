import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgEat = (props: SvgProps) => (
  <Svg
    
    width={30}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M27.7 6.2c-3.6 2.1-8.8 1.5-13.3-.7M14.9 2s0 4.4-4.9 6.2"
    />
  </Svg>
);
const Memo = memo(SvgEat);
export default Memo;

