import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgSad = (props: SvgProps) => (
  <Svg
    
    width={30}
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
      d="M27.5 9.089s-4-4.7-20.5 0"
    />
  </Svg>
);
const Memo = memo(SvgSad);
export default Memo;

