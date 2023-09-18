import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const SvgFuturisticGlasses = (props: SvgProps) => (
  <Svg
    width={140}
    height={123}
    fill="none"
    {...props}
  >
    <Path
      fill="#B7AEA9"
      d="M44.948 48.96s1.4 3 5.6 3.4c4.2.4 55.2-11.2 57-10.9 1.8.3 4.8 1.4 4.8 1.4l11.8 7.5.2-5.2s-6.6-8.2-22.7-7.4c-16.1.8-56.7 11.2-56.7 11.2Z"
      opacity={0.6}
    />
    <Path
      fill="#5E4949"
      d="M47.364 1.061h-.003c-4.17-.107-7.713 3.208-7.713 7.4v9.1c0 4.328-3.48 7.9-7.9 7.9h-4.152l.416.744 3.3 5.9.143.256h.293c4.328 0 7.9 3.48 7.9 7.9v3.2c0 4.61 4.076 8.037 8.571 7.395l.006-.001 55.8-8.7.005-.001c1.148-.191 2.204-.193 3.377-.095l.537.045.004-.54.3-38.1.004-.488-.488-.015-60.4-1.9Z"
    />
    <Path
      fill="#5E4949"
      d="M128.566 3.461h-.004l-20.7-.6-.51-.015-.004.51-.3 38.1-.004.449.445.052c1.66.196 3.195.583 4.624 1.345h-.001l.012.006 11.2 5.6.006.003c3.211 1.55 6.983-.553 7.316-4.104v-.003l3.1-35.6v-.006c.221-2.983-2.096-5.627-5.18-5.737Z"
    />
    <Path
      fill="#E26076"
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="m62.248 17.46 57.9 1.3c3.2.1 5.7 2.9 5.3 6.1-.3 2.8-2.6 4.9-5.4 4.9h-57.9c-3.1 0-5.6-2.6-5.5-5.7l.1-1.3c.1-3.1 2.6-5.3 5.5-5.3Z"
    />
    <Path
      fill="#fff"
      d="M69.448 25.56h-5.5c-1.1 0-2-.9-2-2s.9-2 2-2h5.5c1.1 0 2 .9 2 2-.1 1.1-.9 2-2 2Z"
    />
  </Svg>
);
const Memo = memo(SvgFuturisticGlasses);
export default Memo;

