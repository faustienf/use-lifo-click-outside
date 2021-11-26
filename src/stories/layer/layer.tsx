import React, { FC, useRef } from 'react';
import { useOnClickOutside } from '../../use-on-click-outside';
import './layer.css';

type Props = {
  color: [string, string],
  onClickOutside: () => void;
}

export const Layer: FC<Props> = ({ color, onClickOutside }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useOnClickOutside(ref, onClickOutside);

  return (
    <button
      ref={ref}
      type="button"
      className="layer"
      style={{ backgroundImage: `linear-gradient(45deg, ${color.toString()})` }}
    >
      layer
    </button>
  );
};
