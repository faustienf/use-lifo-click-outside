import React, { FC, ButtonHTMLAttributes } from 'react';
import './select-option.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const SelectOption: FC<Props> = (props) => (
  <li>
    <button
      {...props}
      type="button"
      className="select-option"
    />
  </li>
);
