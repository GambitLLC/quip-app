import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgGlasses = (props: SvgProps) => (
  <Svg
    width={140}
    height={109}
    fill="none"
    {...props}
  >
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M83.5 33.5H60.2c-6.1 0-11-4.9-11-11V13c0-6.1 4.9-11 11-11h23.3c6.1 0 11 4.9 11 11v9.5c0 6.1-5 11-11 11ZM123.7 2h-11.5c-4 0-7.3 3.3-7.3 7.3V18c1.4 5 3.4 9.8 6.4 14.1.3 0 .6.1.9.1h11.5c4 0 7.3-3.3 7.3-7.3V9.3c.1-4.1-3.2-7.3-7.3-7.3Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M94.5 11.1c3.4-.4 7.7-.7 11.3-.3M49.2 11.8l-23.2.8"
    />
  </Svg>
);
const Memo = memo(SvgGlasses);
export default Memo;

