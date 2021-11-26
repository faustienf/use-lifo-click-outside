import React, { FC, useRef } from 'react';
import { useOnClickOutside } from '../../use-on-click-outside';
import './modal.css';

type Props = {
  title: string;
  onClose: () => void;
}

export const Modal: FC<Props> = (props) => {
  const {
    children,
    title,
    onClose,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  return (
    <div
      ref={ref}
      className="modal"
    >
      <h3 className="modal-title">{title}</h3>
      {children}
    </div>
  );
};
