import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgEarphone = (props: SvgProps) => (
  <Svg
    width={140}
    height={198}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M20.714 4.898s-8-1.2-7.4 10c.3 5.7.3 8.8.2 10.4-.1 1.1.6 2.1 1.6 2.5 1.2.5 2.5 0 3.1-1.2.9-1.6 1.9-3.8 1.9-5.6 0-3 3.2-5.7 3.2-5.7s-2.9-2.5-2.6-10.4Z"
    />
    <Path
      fill="#fff"
      d="M44.914 197.698c-.8-.9-32.2-54.6-27.5-74.8 3.2-13.9-1-29.9-4.7-44-1.5-5.8-2.9-11.2-3.7-16-1.4-8.3-.4-16.2 3-23.5 3.7-8.2 3.1-15.3 3.1-15.4l2-.2c0 .3.6 7.8-3.3 16.4-3.2 6.9-4.1 14.5-2.8 22.4.8 4.7 2.2 10.1 3.7 15.9 3.8 14.3 8 30.6 4.7 45-4.4 19.2 26.9 72.9 27.1 73.1l-1.6 1.1Z"
    />
    <Path
      fill="#E5E5E5"
      d="M13.614 20.698c.1 2.2 0 3.7 0 4.6-.1 1.1.6 2.1 1.6 2.5 1.2.5 2.5 0 3.1-1.2.9-1.6 1.9-3.8 1.9-5.6v-.4c-2.1.8-4.5 1.4-6.6.1Z"
    />
    <Path
      fill="#fff"
      d="M107.714 87.198c-.7 4.6-.8 11.9-1 20.4-.3 16.4-10 80.3-14.7 90.4l-1.8-.8c4.5-9.8 14.2-73.4 14.5-89.6.2-8.5.3-15.9 1-20.7 1.5-10.1.4-17.7-.2-20.9.3-.3.6-.5.9-.8.3-.2.5-.5.8-.7.6 2.6 2.3 10.9.5 22.7Z"
    />
  </Svg>
);
const Memo = memo(SvgEarphone);
export default Memo;

