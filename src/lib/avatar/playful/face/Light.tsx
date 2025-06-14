import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgLight = (props: SvgProps) => (
  <Svg
    width={193}
    height={243}
    fill="none"
    {...props}
  >
    <Path
      fill="#F7D3B5"
      d="M192.6 217.9c-.7.5-1.5 1-2.2 1.5-.8.5-1.5 1-2.3 1.4-.7.4-1.3.8-2 1.2-.1.1-.2.1-.3.2-2.3 1.4-4.7 2.7-7.1 3.9-.7.4-1.5.8-2.2 1.1 0 0-.1.1-.2.1l-2.4 1.2c-1.6.8-3.3 1.5-4.9 2.2-.8.4-1.7.7-2.5 1-.8.3-1.7.7-2.5 1-.8.3-1.7.7-2.5 1h-.1c-.8.3-1.7.6-2.5.9-1.8.6-3.7 1.2-5.5 1.8-.6.2-1.3.4-1.9.6-1.9.6-3.8 1.1-5.7 1.5-.7.2-1.4.3-2.2.5-1.8.4-3.7.8-5.5 1.2-.4.1-.7.1-1.1.2-.6.1-1.3.2-1.9.3-.9.1-1.7.3-2.6.4-.4.1-.8.1-1.2.2-.5.1-1.1.2-1.7.2-1.6.2-3.3.4-4.9.6-.5.1-1.1.1-1.6.2h-.1c-.7.1-1.4.1-2.1.2-.7.1-1.4.1-2.1.1-.4 0-.9.1-1.3.1-.8 0-1.5.1-2.2.1-1 0-1.9.1-2.9.1h-5C65.3 242.3 27.3 224.4.3 196c0 0 0-.1-.1-.1 3.1-6.1 14.6-17.1 26.6-26.2 15.2-11.5 36.7-18.6 36.7-18.6s14.1-2.3 66.4 8.6c39.9 8.4 56.9 42.5 62.7 58.2Z"
    />
    <Path
      fill="#F7D3B5"
      d="M141 187.4c-2.1 10.3-15.7 16.4-38.6 7.2-28.1-11.4-38.9-43.5-38.9-43.5-1.5-23-5-42.7-5-42.7 32.5-2.8 70.9 35.2 70.9 35.2l4.4 18.8c.4 1.6 1.2 3 2.4 4 2.1 3.6 6.2 14.4 4.8 21Z"
    />
    <Path
      fill="#EFBDA5"
      d="M136.2 166.5c-19.1-1-33.2-3.8-48.3-30.9 12.8 11.3 27.9 15.6 43.8 17.6l2.1 9.2c.4 1.7 1.2 3.1 2.4 4.1Z"
    />
    <Path
      fill="#F7D3B5"
      d="M175.7 46c1.8 8.4 2.7 15.2-2.2 37.6-4.9 22.4 4.5 44.8-19.1 65.3-15.9 13.8-43.7 16.4-65.9 1.3-7.5-5.1-14.4-12.2-20-21.5-4.4-7.3-9.5-14.2-15.2-20.5-7.9-8.6-17.4-25.9-12.7-56.5 7.6-49.8 56.9-55.5 86-50s44.2 22.1 49.1 44.3Z"
    />
    <Path
      fill="#F7D3B5"
      d="M80 85.1s-3.1-15-17.7-13.2c-12.6 1.6-17 31.8 11.6 40.2"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M73 98.4s-3.6-2.3-3.2-6.3c.6-4.7 0-7.6-2.2-8.5-5.5-2.3-6.6 4.1-6.4 4.9"
    />
    <Path
      fill="#EFBDA5"
      d="M149.3 108.1s3.8.2 7.4-4.1c2-2.4 3.7-5.4 2.6-6.3-1.1-1-19.2 1.8-20.4 4.2-1.2 2.4 5.8 6.2 10.4 6.2Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M152.3 74.5s.2 9.5 6.3 20.1c2.7 4.7-1.4 12.4-10.3 13.7"
    />
    <Path
      fill="#ED938A"
      d="M98.1 113.2c5.689 0 10.3-3.806 10.3-8.5s-4.611-8.5-10.3-8.5c-5.688 0-10.3 3.806-10.3 8.5s4.612 8.5 10.3 8.5ZM171.9 96.4c-.3 5.6-.2 11.1-.6 16.6-4.4-1-7.6-4.3-7.6-8.2 0-4.2 3.5-7.6 8.2-8.4Z"
      opacity={0.42}
    />
  </Svg>
);
const Memo = memo(SvgLight);
export default Memo;

