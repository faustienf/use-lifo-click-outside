import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './select';
import { SelectOption } from './select-option';
import { Modal } from '../modal';
import { Button } from '../button';

export default {
  title: 'Example/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: 200, maxWidth: '100%' }}>
      <Select
        {...args}
        placeholder="Choose your favorite"
        value={value}
      >
        <SelectOption onClick={() => setValue('PlayStayion 5')}>PlayStayion 5</SelectOption>
        <SelectOption onClick={() => setValue('Xbox Series')}>Xbox Series</SelectOption>
        <SelectOption onClick={() => setValue('Nintendo Switch')}>Nintendo Switch</SelectOption>
        <SelectOption onClick={() => setValue('PC')}>PC</SelectOption>
      </Select>
    </div>
  );
};

export const Regular = Template.bind({});
Regular.args = {};

const ModalTemplate: ComponentStory<typeof Select> = (args) => {
  const [isShown, setShown] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <Button
        type="button"
        onClick={() => setShown(true)}
      >
        Show
      </Button>

      {isShown && (
        <Modal
          title="Platform"
          onClose={() => setShown(false)}
        >
          <Select
            {...args}
            placeholder="Choose your favorite"
            value={value}
          >
            <SelectOption onClick={() => setValue('PlayStayion 5')}>PlayStayion 5</SelectOption>
            <SelectOption onClick={() => setValue('Xbox Series')}>Xbox Series</SelectOption>
            <SelectOption onClick={() => setValue('Nintendo Switch')}>Nintendo Switch</SelectOption>
            <SelectOption onClick={() => setValue('PC')}>PC</SelectOption>
          </Select>
        </Modal>
      )}
    </div>
  );
};

export const InModal = ModalTemplate.bind({});
InModal.args = {};
