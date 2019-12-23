import React from 'react';
import { IconButton } from 'material-ui';
import { Tooltip } from 'react-tippy';

import AngryImage from './angry.png';
import AwakeImage from './awake.png';
import CryImage from './cry.png';
import DanceImage from './dance.png';
import IndifferentImage from './indifferent.png';
import SingImage from './sing.png';

function buildCustomIcon(image, tip) {
  const customIconProps = {
    iconStyle: {
      cursor: 'pointer',
      fill: '#fff',
      filter: 'invert(100%)',
      height: '36px',
      margin: '12px',
      padding: '12px',
      width: '36px',
    },
    style: {
      cursor: 'pointer',
      height: '36px',
      marginRight: '12px',
      padding: '12px',
      width: '36px',
    },
  };

  return props => {
    customIconProps.onClick = props.onClick;
    return (
      <Tooltip
        title={tip}
        position="bottom"
        trigger="mouseenter"
        className="tool-tip"
        key={tip}
      >
        <IconButton {...customIconProps}>
          <img src={image} />
        </IconButton>
      </Tooltip>
    );
  };
}

export const AngryIcon = buildCustomIcon(AngryImage, 'Angry');
export const AwakeIcon = buildCustomIcon(AwakeImage, 'Awake');
export const CryIcon = buildCustomIcon(CryImage, 'Cry');
export const DanceIcon = buildCustomIcon(DanceImage, 'Dance');
export const IndifferentIcon = buildCustomIcon(IndifferentImage, 'Indifferent');
export const SingIcon = buildCustomIcon(SingImage, 'Sing');
