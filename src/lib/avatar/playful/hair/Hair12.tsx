import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const Svg12 = (props: SvgProps) => (
  <Svg
    
    width={250}
    height={207}
    fill="none"
    {...props}
  >
    <Path
      fill="#99807F"
      d="M53.505 79.276c-4 29.2 9.1 49.3 16.1 57.7 8 9.6 8.7 16.9 8.7 16.9 4.1-2.3 9.3-12.6 9.4-18-25-9.6-20.5-37.5-8.3-39.1 12.8-1.6 16.8 9.8 17.5 12.6 3.2-3.8 3-25.4 6.7-38.9-16.1 5.8-33.1 8.9-50.1 8.8Z"
    />
    <Path
      fill="#423232"
      d="M180.905 41.676c-6.2-3-11.5-9.3-19.3-12.4-45.6-18.5-94.5.4-105.2 36.9-1.4 4.6-2.3 9-2.9 13.2 17 .1 34.1-3.1 50.1-8.8 1.6-5.8 3.9-10.2 7.6-11 19.3-4.2 37.4-6.3 60.3-3.2 8.5 1.2 15-2.7 19.4 8.1.7 2.1 1.3 4.2 1.8 6.4 1.6 7.1 2.4 13.1-.3 28.3 1.8-2.9 4.1-9.1 5.1-14.4 3.2-18.7 1.7-34.3-16.6-43.1Z"
    />
    <Path
      fill="#423232"
      d="M193.605 75.076c1 4.8 7.1 4.4 8-.4 1.3-7 1.9-15.4.8-24.9-5.2-44.4-49.3-59.4-40.8-29.8 0 0-11.6-18.6-37.7-19.6-22.4-.8-8.8 15.1-8.8 15.1s-27.4-10-56.9 5c-25.7 13.1-1.9 24.6-1.9 24.6s-19.5 10.3-19.8 32.5c-.2 16.6 53.5 17.3 73.9 5.2 10.6-6.3 15.6-17.2 26.4-23.6 18.9-11.3 23.8 14.2 33.9 4.8 11.8-10.8 20.3-2.2 22.9 11.1Z"
    />
  </Svg>
);
const Memo = memo(Svg12);
export default Memo;

