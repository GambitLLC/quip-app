import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgCute = (props: SvgProps) => (
  <Svg
    
    width={34}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M28.1 2.406s2.6-1.4 4 1-2 5.1-2 5.1 3.8 2.8 1.2 6.3c-2.1 2.8-5.3 2.6-5.3 2.6"
    />
  </Svg>
);
const Memo = memo(SvgCute);
export default Memo;

