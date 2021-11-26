import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Layer } from './layer';

export default {
  title: 'Example/Layer',
  component: Layer,
  argTypes: {},
} as ComponentMeta<typeof Layer>;

const allColors = [
  ['#FF5252', '#F48FB1'],
  ['#00E5FF', '#CCFF90'],
  ['#FF8F00', '#FFECB3'],
  ['#E040FB', '#4FC3F7'],
  ['#EA80FC', '#FCE4EC'],
  ['#D500F9', '#FFA000'],
  ['#0097A7', '#CCFF90'],
  ['#9C27B0', '#FF3D00'],
  ['#E65100', '#FFA000'],
  ['#FFFF8D', '#B9F6CA'],
  ['#FFF9C4', '#64FFDA'],
  ['#0288D1', '#26C6DA'],
  ['#7C4DFF', '#D500F9'],
  ['#D1C4E9', '#F3E5F5'],
].sort(() => 0.5 - Math.random()) as [string, string][];

const initialColors: [string, string][] = [
  ['#0277BD', '#C51162'],
  ['#039BE5', '#F50057'],
  ['#29B6F6', '#FF4081'],
  ['#81D4FA', '#FF80AB'],
];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const getRandomColor = (excludes: [string, string][] = []): [string, string] => {
  const newColor = allColors[random(0, allColors.length)];
  const isUnique = excludes.every((items) => items.toString() !== newColor.toString());

  return isUnique ? newColor : getRandomColor(excludes);
};

const Template: ComponentStory<typeof Layer> = (args) => {
  const [colors, setColors] = useState(initialColors || allColors.slice(0, 4));

  const handleClickOutside = (removeIndex: number) => {
    setColors((state) => {
      const nextState = state.slice();
      nextState.splice(removeIndex, 1);
      return [getRandomColor(state), ...nextState];
    });
  };

  return (
    <div style={{ width: 400, height: 200, marginTop: 50 }}>
      {colors.map((color, index) => (
        <Layer
          key={color.toString()}
          color={color}
          onClickOutside={() => handleClickOutside(index)}
        />
      ))}
    </div>
  );
};

export const Regular = Template.bind({});
Regular.args = {};
