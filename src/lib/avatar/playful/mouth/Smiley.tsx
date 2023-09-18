import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgSmiley = (props: SvgProps) => (
  <Svg
    
    width={31}
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
      d="M28.8 6.7c-2.5 1.1-3.7-1.1-7.6.8-2.8 1.3-4.3 1.7-7.7-.3C11.3 5.8 8.6 7.8 6 4"
    />
  </Svg>
);
const Memo = memo(SvgSmiley);
export default Memo;

