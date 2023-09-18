import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgOpenMouth = (props: SvgProps) => (
  <Svg
    
    width={30}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M25.959 9.25c.1 1.6-1.1 4.4-3.3 6.4-11.3-6.9-16.4-3.3-16.4-3.3-4-6.1-3.1-14.4 6.6-8.1 6.8 4.3 10.9 5 13.1 5Z"
    />
    <Path
      fill="#FE9DAB"
      d="M22.658 15.65c-2.4 2.1-6 3.4-10.9 1.4-2.3-.9-4.1-2.7-5.5-4.7 0 0 5.1-3.6 16.4 3.3Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M27.858 8.85s-4.2 2.3-15-4.6c-12.9-8.3-10.3 9.1-1.2 12.8 9.5 3.9 14.4-4.6 14.3-7.8"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M6.258 12.35s5.1-3.6 16.4 3.3"
    />
  </Svg>
);
const Memo = memo(SvgOpenMouth);
export default Memo;

