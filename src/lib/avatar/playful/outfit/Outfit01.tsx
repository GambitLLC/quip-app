import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { memo } from 'react';
const Svg01 = (props: SvgProps) => (
  <Svg
    width={295}
    height={196}
    fill="none"
    {...props}
  >
    <Path
      fill="#6060D8"
      d="M235.705 74.778c-14.2-18.3-36.2-25.9-48.301-30.4-1-5-2.899-10.5-5.899-15.8-4.601 2.8-9.9 4.9-15.4 6l.799 3.3c.4 1.6 2.401 9-.7 18.5-2.6 8-13.099 11.6-30.899 3.5-34.7-15.7-38.7-33.4-38.7-33.4-.6-9.6-1.6-18.6-2.5-25.9-10.8 2.4-23.3 7.3-30.1 17.6-8.4 12.6-11.5 25.4-10.7 35.6-14.6 9.3-37.2 23.4-44.6 48.6-9.6 32.8-8 52.9-8 52.9h258.399c-.299.1-4.099-55.6-23.399-80.5Z"
    />
    <Path
      stroke="#423232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M81.204 41.978s6.1 23.7 32.8 40.1M187.304 44.378s7.1 30.7-8.4 44.8M139.104 84.478s-5.2 15.2-3.8 25.7M171.004 83.578s3.9 8.5 6.7 22M53.105 53.878s8.2 33.4 56.999 43.2"
    />
    <Path
      fill="#fff"
      d="m136.204 112.478-4.4-.4c-1.6-.2-2.8-1.7-2.5-3.3l1.5-7.5c.4-2.1 2.4-3.6 4.5-3.3 2.1.2 3.8 2 3.8 4.2l.1 7.7c0 1.5-1.4 2.8-3 2.6ZM182.104 107.878l-4.2 1.5c-1.6.6-3.3-.4-3.6-2l-1.8-7.4c-.5-2.1.6-4.2 2.7-5 2-.7 4.3.2 5.2 2.1l3.3 6.9c.7 1.5 0 3.3-1.6 3.9Z"
    />
    <Path
      stroke="#544D4D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M49.704 155.378s-.9-22.3-3.9-28.3M226.204 105.578s5.6 31.4 3.4 49.8M210.104 135.778s-14.8 2.2-27.8 1.6"
    />
  </Svg>
);
const Memo = memo(Svg01);
export default Memo;

