import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgCynic = (props: SvgProps) => (
  <Svg
    width={78}
    height={43}
    fill="none"
    {...props}
  >
    <Path
      fill="#423232"
      d="M18.072 27.311v.2l-.1 2.8c-.1 2.4-2.1 4.2-4.5 4.1-2.4-.1-4.2-2.2-4-4.5l.1-2.8c0-.5.2-1.1.4-1.5l8 .4c0 .4.1.8.1 1.3ZM59.871 29.511l-.1 2.6c-.1 2.2-2 3.9-4.2 3.8-2.2-.1-3.9-2-3.8-4.2l.1-2.6c0-.5.1-1 .3-1.4l7.5.3c.2.5.2 1 .2 1.5ZM28.071 13.611c2.2.3 3.9-2 3.1-4.2-.4-1.2-1.1-2.3-2.2-3-3.4-2.1-16.1-2.3-22.8 2.5-5.9 4.4 11.9 3.3 21.9 4.7ZM55.771 14.711c-1.8 0-2.9-2.3-2-4.2.5-1 1.2-1.9 2.2-2.4 3.1-1.5 11.4-.6 15.1 4.5 3.3 4.5-7 2-15.3 2.1Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="m24.571 26.211-6.7-.3-8-.3-1.8-.1M64.072 28.211l-4.4-.2-7.5-.3h-.3"
    />
  </Svg>
);
const Memo = memo(SvgCynic);
export default Memo;

