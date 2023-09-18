import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgRoundedGlasses = (props: SvgProps) => (
  <Svg
    width={145}
    height={121}
    fill="none"
    {...props}
  >
    <Path
      fill="#B7AEA9"
      d="M110.234 47.39s1.2 6.8 9.1 10.2c2 .8 4.1-.5 4.1-2.7-.1 0-12.7-6.7-13.2-7.5ZM91.234 30.99s6.4-6.4 9.6-7.1l-8.5 2-1.1 5.1ZM48.535 47.39s3.7 8.4 14.8 10.4c11.1 2.1 21.2-5.9 25.9-19.3 0 0-3.8 12.4-19 14.7-15.1 2.5-21.7-5.8-21.7-5.8Z"
      opacity={0.6}
    />
    <Path
      fill="#DBC3ED"
      d="M66.434 2.49c-14.1 0-25.6 11.8-25.7 26.2 0 6.8 2.5 13 6.6 17.5l36.3-36.7c-4.5-4.4-10.5-7-17.2-7Z"
      opacity={0.29}
    />
    <Path
      fill="#C4ADD8"
      d="m83.635 9.49-36.3 36.7c4.6 5.1 11.1 8.2 18.3 8.2 13.9 0 25.3-11.5 25.7-25.8.2-7.5-2.8-14.3-7.7-19.1Z"
      opacity={0.23}
    />
    <Path
      fill="#DBC3ED"
      d="M124.935 2.49c-10.7 0-19.7 11.8-20.1 26.2-.2 5.8 1.1 11.1 3.3 15.4l31.7-31.4c-3.3-6.2-8.7-10.2-14.9-10.2Z"
      opacity={0.29}
    />
    <Path
      fill="#C4ADD8"
      d="m139.835 12.59-31.7 31.4c3.3 6.3 8.7 10.4 15 10.4 10.5 0 19.5-11.5 20.1-25.8.2-5.9-1.1-11.5-3.4-16Z"
      opacity={0.23}
    />
    <Path
      stroke="#4EC2DD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M91.335 28.69c-.3 14.3-11.8 25.8-25.7 25.8-13.9 0-25-11.5-25-25.8.1-14.4 11.6-26.2 25.7-26.2s25.4 11.8 25 26.2ZM143.234 28.69c-.6 14.3-9.6 25.8-20.1 25.8-10.5 0-18.7-11.5-18.3-25.8.4-14.4 9.4-26.2 20.1-26.2 10.7 0 18.9 11.8 18.3 26.2ZM40.934 25.89h-14.2M91.435 25.89s11.9-4.6 13.4 0"
    />
  </Svg>
);
const Memo = memo(SvgRoundedGlasses);
export default Memo;

