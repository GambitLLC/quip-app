import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgAngry = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M21.642 26.507s-7 .1-14.1-5.2M51.343 28.107s7.2-1.3 9.3-4.1"
    />
    <Path
      fill="#423232"
      d="M26.443 18.807c1.9 1.1 4.3-.4 4.4-2.7 0-1.2-.2-2.5-1-3.6-2.4-3.2-14.1-8.1-22.2-6-7 1.8 10.1 7.3 18.8 12.3ZM57.143 20.007c-1.4 1.1-3.7-.2-4-2.3-.2-1.1-.1-2.3.4-3.3 1.6-3 9-7.1 15-5.1 5.2 1.9-4.7 5.8-11.4 10.7ZM10.343 23.107c-.8.7-1.3 1.8-1.4 2.9l-.1 2.8c-.1 2.4 1.7 4.4 4 4.5 2.4.1 4.4-1.7 4.5-4l.1-2.8v-.3c-2.6-.2-4.9-1.3-7.1-3.1ZM51.343 27.907v.2l-.1 2.6c-.1 2.2 1.6 4.1 3.8 4.2 2.2.1 4.1-1.6 4.2-3.8l.1-2.6c.1-1-.3-1.9-.8-2.6-2.2 1.3-4.6 1.6-7.2 2Z"
    />
  </Svg>
);
const Memo = memo(SvgAngry);
export default Memo;

