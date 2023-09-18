import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgThin = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M28.709 12.611c2.172.3 3.851-2 3.061-4.2-.395-1.2-1.086-2.3-2.172-3-3.358-2.1-15.9-2.3-22.515 2.5-5.827 4.4 11.75 3.3 21.626 4.7ZM56.062 13.711c-1.777 0-2.864-2.3-1.975-4.2.494-1 1.185-1.9 2.172-2.4 3.062-1.5 11.258-.6 14.912 4.5 3.258 4.5-6.913 2-15.109 2.1Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M25.252 25.211c-6.32-3.2-16.294-.8-16.294-.8M64.258 27.211s-2.567-2.8-12.047-.6"
    />
  </Svg>
);
const Memo = memo(SvgThin);
export default Memo;

