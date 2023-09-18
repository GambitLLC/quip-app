import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const Svg04 = (props: SvgProps) => (
  <Svg
    
    width={290}
    height={190}
    fill="none"
    {...props}
  >
    <Path
      fill="#BEE3EB"
      d="M254.045 149.289H1.245s1.5-46.4 16.7-79.5c11.5-25 38.6-38.9 58.8-46.1 5.7-2 10.9-3.5 14.9-4.6 0 .5.1.9.1 1.4 0 0 10.8 32.1 38.9 43.5 22.9 9.3 36.5 3.1 38.6-7.2 1.3-6.6-2.8-17.4-4.9-20.9-1.2-1-2-2.5-2.4-4l-.8-3.3c1.9-.4 3.7-.9 5.5-1.5.6-.2 1.1-.4 1.7-.6 12.9 3.4 32.3 11.5 55.2 30.7 25.9 21.6 30.5 92.1 30.5 92.1Z"
    />
    <Path
      fill="#fff"
      d="M121.945 74.39c-34.5-15.5-47.9-43.2-45.3-50.7 0 0 0-.1.1-.2 1.8-3.7 4.7-6.7 8.3-8.8 2-1.2 4.2-2.3 6-2.9.1 1.4.5 5.8.6 7.3 0 .5.1.9.1 1.4 0 0 6.4 23.9 34.5 35.3 22.9 9.3 37.1 3.2 38.6-7.2 1.7-11.5-4.8-19.8-4.8-19.8 1.9-.4 4.9-1.1 6.7-1.7 4.4 5.3 8.9 10.6 10.6 24.6 2.4 20.1-19.7 38.8-55.4 22.7Z"
    />
    <Path
      stroke="#544D4D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="m50.745 149.289-4.5-37.1M225.345 99.59s-3 7.299-2.1 14.599c.9 7.3 3.5 18-.2 35.1"
    />
  </Svg>
);
const Memo = memo(Svg04);
export default Memo;

