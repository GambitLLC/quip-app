import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgClosed = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M28.071 12.611c2.2.3 3.9-2 3.1-4.2-.4-1.2-1.1-2.3-2.2-3-3.4-2.1-16.1-2.3-22.8 2.5-5.9 4.4 11.9 3.3 21.9 4.7ZM55.771 13.711c-1.8 0-2.9-2.3-2-4.2.5-1 1.2-1.9 2.2-2.4 3.1-1.5 11.4-.6 15.1 4.5 3.3 4.5-7 2-15.3 2.1Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M24.571 25.211c-7.8 3.3-16.5-.8-16.5-.8M64.072 27.211s-5.4 3.3-12.2-.6"
    />
  </Svg>
);
const Memo = memo(SvgClosed);
export default Memo;

