import React, { ButtonHTMLAttributes, FC } from 'react';
import './button.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ children, ...rest }) => (
  <button
    type="button"
    {...rest}
    className="button"
  >
    <span className="button-label">{children}</span>
  </button>
);
