import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgEarring = (props: SvgProps) => (
  <Svg
    width={140}
    height={88}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFDE55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M18.495 20.9v17"
    />
    <Path
      fill="#FFDE55"
      d="M31.995 60.7c-2.7 2.7-6.4 4.4-10.6 4.4-8.1 0-14.8-6.6-14.8-14.8 0-8.1 6.6-14.8 14.8-14.8 4.1 0 7.9 1.7 10.6 4.4-1.8-1-3.8-1.6-6-1.6-6.6 0-12 5.4-12 12s5.4 12 12 12c2.2.1 4.2-.5 6-1.6Z"
    />
    <Path
      fill="#FF6B57"
      d="M18.495 56.3a5.9 5.9 0 1 0 0-11.8 5.9 5.9 0 0 0 0 11.8Z"
    />
    <Path
      fill="#FFDE55"
      d="M132.595 40.1c-1.8-1-3.8-1.6-6-1.6-1.6 0-3 .3-4.4.9.2-1.2.5-2.4.6-3.6 3.9.1 7.3 1.7 9.8 4.3ZM132.695 60.7c-2.7 2.7-6.4 4.4-10.6 4.4-4.2 0-8.1-1.8-10.8-4.7 1.6-1.8 3-3.6 4.3-5.4 1.8 4.3 6.1 7.2 11 7.2 2.2.2 4.3-.4 6.1-1.5Z"
    />
    <Path
      fill="#FF6B57"
      d="M125.095 50.4c0 3.3-2.6 5.9-5.9 5.9-1.3 0-2.5-.4-3.5-1.2 2.3-3.4 4-6.9 5.1-10.3 2.4.6 4.3 2.9 4.3 5.6Z"
    />
  </Svg>
);
const Memo = memo(SvgEarring);
export default Memo;

