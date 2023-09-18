import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgStylishGlasses = (props: SvgProps) => (
  <Svg
    width={140}
    height={108}
    fill="none"
    {...props}
  >
    <Path
      fill="#B7AEA9"
      d="M83.2 32.926s-9.4 5.9-20 5.8c-10.6-.1-11.9-8.4-12-12.9 0 0 1.4 6.5 7.8 8.9 6.3 2.4 24.2-1.8 24.2-1.8ZM113.4 31.826s2.3 2.8 5.4 4.8c2.1 1.4 4.9-.1 4.9-2.6.1 0-5.8.3-10.3-2.2Z"
      opacity={0.6}
    />
    <Path
      fill="#FE9DAB"
      d="m86.9 4.626-29.4 29.4c2.3 1.4 5.1 2.1 7.9 1.7l14-1.8c4.2-.6 8.1-2.7 11.1-6.2 1.2-1.3 1.9-3.1 2-5l.5-9.9c.2-4.3-2.5-7.9-6.1-8.2Z"
      opacity={0.43}
    />
    <Path
      fill="#FE9DAB"
      d="m86.9 4.626-28.1-2.6c-4.7-.4-8.7 3.9-8.7 9.3v8.5c0 6.2 3 11.5 7.4 14.2l29.4-29.4ZM127.9 3.626l-17.6 2.3c-2.3.3-4 3.6-3.8 7.4l.3 8.9c.1 1.7.5 3.3 1.2 4.5 1.2 2 2.7 3.5 4.3 4.5l20.9-20.9c-.4-4-2.7-7-5.3-6.7Z"
      opacity={0.3}
    />
    <Path
      fill="#FE9DAB"
      d="M112.4 31.326c.9.5 1.7.9 2.7 1.1l8.7 1.7c5.1 1 9.6-5.7 9.6-14.4v-7.6c0-.6 0-1.1-.1-1.6l-20.9 20.8Z"
      opacity={0.43}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3.237}
      d="m86.9 4.626-28.1-2.6c-4.7-.4-8.7 3.9-8.7 9.3v8.5c0 9.6 7.2 17 15.3 15.9l14-1.8c4.2-.6 8.1-2.7 11.1-6.2 1.2-1.3 1.9-3.1 2-5l.5-9.9c.2-4.3-2.5-7.9-6.1-8.2ZM110.4 6.026l17.6-2.3c2.9-.4 5.4 3.5 5.4 8.4v7.6c0 8.6-4.5 15.3-9.6 14.4l-8.7-1.7c-2.6-.5-5.1-2.5-6.9-5.6-.7-1.2-1.2-2.8-1.2-4.5l-.3-8.9c-.3-3.8 1.4-7.1 3.7-7.4Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="m50.1 12.326-23.1-.5"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3.237}
      d="M93 13.026s12.1-2.4 13.6 0"
    />
  </Svg>
);
const Memo = memo(SvgStylishGlasses);
export default Memo;

