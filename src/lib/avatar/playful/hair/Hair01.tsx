import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const Svg01 = (props: SvgProps) => (
  <Svg
    width={250}
    height={202}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M200.171 42.285c-7.1 25.7-27.7 21.4-47 14.4-25.7-9.4-48.3-1.8-48.4 21.4-.2 34-8.7 23.7-9.6 22.4-2.2-4.2-6.9-9.4-15.8-8.3-11.7 1.5-16.3 27.3 5.5 37.9 3.8 19.3-6.6 17.5-6.6 17.5-3.5-14.2-32.9-44.4-33-64.3 0-26.8 13.5-34.4 13.5-34.4.4-18.7 19.9-39.3 52.7-38.6 32.8.6 52.899-.3 59.299-8 6.4-7.9 36.501 14.3 29.401 40Z"
    />
    <Path
      fill="#423232"
      d="M200.971 73.185c-1 6.5-3.8 11.5-7.7 15.2 1.5-10.9.7-16.1-.6-22.2-2.8-12.5-8.8-23.3-18.8-31.3 5-.4 10.1.7 14.7 3.6 0-.1 16.5 6.6 12.4 34.7Z"
    />
  </Svg>
);
const Memo = memo(Svg01);
export default Memo;

