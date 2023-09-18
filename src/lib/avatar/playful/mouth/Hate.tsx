import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgHate = (props: SvgProps) => (
  <Svg
    
    width={33}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M30.8 7.651s-12.7-5.9-18.8-2.7"
    />
  </Svg>
);
const Memo = memo(SvgHate);
export default Memo;

