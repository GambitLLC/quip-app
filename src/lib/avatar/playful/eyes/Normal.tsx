import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgNormal = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M14.433 34.047c-2.4-.1-4.2-2.1-4-4.5l.1-2.8c.1-2.4 2.1-4.2 4.5-4 2.4.1 4.2 2.1 4 4.5l-.1 2.8c-.1 2.3-2.1 4.1-4.5 4ZM56.533 35.547c-2.2-.1-3.9-2-3.8-4.2l.1-2.6c.1-2.2 2-3.9 4.2-3.8 2.2.1 3.9 2 3.8 4.2l-.1 2.6c-.1 2.2-2 3.9-4.2 3.8Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M24.133 28.247s-2.6-3.7-7.1-4.4c-3.7-.6-7.8 1.2-8.4 3.3M53.633 29.148s0-3.2 4.6-3.2c3.8 0 5.4 3.5 5.4 3.5"
    />
    <Path
      fill="#423232"
      d="M28.233 12.147c2.1.7 4.2-1.2 3.8-3.5-.2-1.2-.7-2.4-1.7-3.3-3-2.7-15.4-5.1-22.9-1.6-6.6 3.2 11.2 5.2 20.8 8.4ZM58.133 13.748c-1.7.6-3.5-1.2-3.2-3.3.1-1.1.5-2.2 1.3-3 2.4-2.4 10.6-4.3 15.8-.6 4.5 3.1-6.1 4-13.9 6.9Z"
    />
  </Svg>
);
const Memo = memo(SvgNormal);
export default Memo;

