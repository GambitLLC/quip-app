import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgNormalSmile = (props: SvgProps) => (
  <Svg
    
    width={30}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M24.5 8C18.8 11.4 8.7 7.7 4 2"
    />
  </Svg>
);
const Memo = memo(SvgNormalSmile);
export default Memo;

