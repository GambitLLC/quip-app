import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgNormalThin = (props: SvgProps) => (
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
      strokeWidth={2.468}
      d="M25.5 4.5C21.1 7.1 14.1 5.5 9 2"
    />
  </Svg>
);
const Memo = memo(SvgNormalThin);
export default Memo;

