import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgSad = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M14.828 34.678c-2.4-.1-4.2-2.1-4-4.5l.1-2.8c.1-2.4 2.1-4.2 4.5-4 2.4.1 4.2 2.1 4 4.5l-.1 2.8c-.1 2.3-2.1 4.1-4.5 4ZM56.928 36.178c-2.2-.1-3.9-2-3.8-4.2l.1-2.6c.1-2.2 2-3.9 4.2-3.8 2.2.1 3.9 2 3.8 4.2l-.1 2.6c-.1 2.2-2 3.9-4.2 3.8Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M24.528 28.878s-2.6-3.7-7.1-4.4c-3.7-.6-7.8 1.2-8.4 3.3M54.028 29.778s0-3.2 4.6-3.2c3.8 0 5.4 3.5 5.4 3.5"
    />
    <Path
      fill="#423232"
      d="M30.228 11.478c2.2-.2 3.3-2.8 2.1-4.8-.7-1-1.6-1.9-2.9-2.4-3.8-1.2-16.2 1.5-21.6 7.7-4.8 5.7 12.4.4 22.4-.5ZM56.628 13.078c-1.7-.5-2.2-3-.8-4.6.7-.8 1.7-1.5 2.8-1.7 3.4-.6 11.2 2.5 13.4 8.4 2 5.1-7.3-.1-15.4-2.1Z"
    />
  </Svg>
);
const Memo = memo(SvgSad);
export default Memo;

