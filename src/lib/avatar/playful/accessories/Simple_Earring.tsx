import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgSimpleEarring = (props: SvgProps) => (
  <Svg
    width={140}
    height={88}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFDE55"
      d="m20.27 18.967 1.7 3.4c.3.6.9 1 1.5 1.1l3.8.6c1.7.2 2.3 2.3 1.1 3.5l-2.7 2.7c-.5.5-.7 1.1-.6 1.8l.6 3.8c.3 1.7-1.5 2.9-3 2.2l-3.4-1.8c-.6-.3-1.3-.3-1.9 0l-3.4 1.8c-1.5.8-3.3-.5-3-2.2l.6-3.8c.1-.7-.1-1.3-.6-1.8l-2.7-2.7c-1.2-1.2-.5-3.2 1.1-3.5l3.8-.6c.7-.1 1.2-.5 1.5-1.1l1.7-3.4c1-1.6 3.2-1.6 3.9 0ZM127.771 30.166c-.5.5-.7 1.2-.6 1.8l.6 3.8c.3 1.7-1.5 3-3 2.2l-2-1.1c.7-4.9.9-9.9 1-14.9l.199.4c.3.6.9 1 1.5 1.1l3.801.5c1.7.2 2.4 2.3 1.1 3.5l-2.6 2.7Z"
    />
  </Svg>
);
const Memo = memo(SvgSimpleEarring);
export default Memo;

