import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Svg, SvgProps} from 'react-native-svg';

const RefreshIcon: FC<SvgProps> = props => {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <G clipPath="url(#clip0_1_132)">
        <Path
          d="M22.167 9.333L17.5 14H21a6.998 6.998 0 01-10.273 6.19l-1.703 1.702A9.35 9.35 0 0014 23.333 9.33 9.33 0 0023.333 14h3.5l-4.666-4.667zM7 14a6.998 6.998 0 0110.273-6.19l1.703-1.703A9.35 9.35 0 0014 4.667 9.33 9.33 0 004.667 14h-3.5l4.666 4.667L10.5 14H7z"
          fill="#000"
          fillOpacity={0.5}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_132">
          <Path fill="#fff" d="M0 0H28V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default RefreshIcon;
