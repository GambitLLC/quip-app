import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgAngry = (props: SvgProps) => (
  <Svg
    
    width={33}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M28.41 7.226c-.2 1.7-.3 2.9-.6 3.9-1.2 5.3-3.6 2.7-8 2.8-5.5.1-14.9 5.4-16.9-1.7-.4-1.3-.6-2.5-.7-3.6-1-10 8.8-6.7 18.6-2.9 3.8 1.6 6.2 1.7 7.6 1.5Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.627}
      d="m27.909 11.126-2.7-.3M30.91 5.726s-1.4 3.5-10.1.1c-11-4.3-22.1-7.8-17.9 6.5 2.1 7 11.4 1.8 16.9 1.7 5.2-.1 7.6 3.5 8.6-6.7"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.627}
      d="M2.209 8.626c1 .2 6.6-1.8 7.9.1 1.3 1.9 2.9.2 3.7.5.8.3 4.4.8 4.4.8"
    />
  </Svg>
);
const Memo = memo(SvgAngry);
export default Memo;

