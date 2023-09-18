import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgMoustache = (props: SvgProps) => (
  <Svg
    width={140}
    height={88}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M101.91 26.603s-3.7-7.9-17.4-3c-8.8 3.2-17.4 8.2-22.2 3 0 0 2.5 13 18.1 15.8 19.2 3.3 23.3-9.9 21.5-15.8Z"
    />
    <Path
      fill="#423232"
      d="M101.109 25.403s5.7-5.4 11.2-.3c5 4.6 7.4 5.3 9.2 2.5 0 0 .4 11-8.3 12.4-9.5 1.6-13-6-13-6"
    />
  </Svg>
);
const Memo = memo(SvgMoustache);
export default Memo;

