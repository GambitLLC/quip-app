import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgOpenTooth = (props: SvgProps) => (
  <Svg
    
    width={30}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M25.997 9.218c.1 3.3-4.8 11.7-14.3 7.8-9.1-3.7-11.8-21.1 1.2-12.8 6.8 4.3 10.9 5 13.1 5Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M27.897 8.818s-4.2 2.3-15-4.6c-12.9-8.3-10.3 9.1-1.2 12.8 9.5 3.9 14.4-4.6 14.3-7.8"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M4.097 6.718s6.8 4.5 8.8 4.1c2.1-.3 1.8 2.6 11.3 2.9"
    />
  </Svg>
);
const Memo = memo(SvgOpenTooth);
export default Memo;

