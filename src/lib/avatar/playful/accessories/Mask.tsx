import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgMask = (props: SvgProps) => (
  <Svg
    width={140}
    height={93}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M113.174 15.018c-2.7-3.3-6.2-5.6-10.4-5.7-4.4-.1-11.3.9-18.2 6.4-9 7.2-27 6.1-34.1 5.4-2-.2-3.9.8-4.8 2.6-2 4-4.7 12.3-3.4 25.7 1.7 18.3 16.6 34.9 37.6 33.5 27.6-1.7 43.7-23.9 44.7-53.6-.2-8.2-5.1-6.5-11.4-14.3Z"
    />
    <Path
      stroke="#EDF3F4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M76.274 21.119s42.1 19 45.7 5.2M59.274 34.719s42.5 24.3 61.6 11.1M57.774 51.919s21.9 19.7 53.4 12.6"
    />
    <Path
      stroke="#EDF3F4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M63.574 22.819s-4.2 5.8-5.9 21.1c-2 18.4 6.7 33.7 6.7 33.7"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M49.674 23.619s-11.5-8-19.6-21.8M24.174 32.919c2.3 7.5 8 19.7 22.4 30.7"
    />
  </Svg>
);
const Memo = memo(SvgMask);
export default Memo;

