import React, {
  FC, useRef, useState,
} from 'react';
import { useOnClickOutside } from '../../use-on-click-outside';
import { Portal } from '../use-portal';
import './select.css';

type Props = {
  placeholder?: string;
  value: string;
}

export const Select: FC<Props> = (props) => {
  const {
    placeholder,
    value,
    children,
  } = props;
  const [isShown, setShown] = useState(false);
  const rootRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const positionRef = useRef({ left: 0, top: 0, width: 0 });

  const toggleVisible = () => {
    const rootEl = rootRef.current;
    if (!rootEl) {
      return;
    }

    const {
      left,
      top,
      width,
      height,
    } = rootEl.getBoundingClientRect();
    positionRef.current = { left, width, top: top + height };

    setShown((state) => !state);
  };

  useOnClickOutside(optionsRef, (e) => {
    if (!rootRef.current?.contains(e.target as Node)) {
      setShown(false);
    }
  });

  return (
    <button
      ref={rootRef}
      className="select"
      type="button"
      onClick={toggleVisible}
    >
      <span className="select-label" data-empty={!value}>
        {value || placeholder}
      </span>

      {isShown && (
        <Portal>
          <ul
            ref={optionsRef}
            style={positionRef.current}
            className="select-options"
          >
            {children}
          </ul>
        </Portal>
      )}
    </button>
  );
};
