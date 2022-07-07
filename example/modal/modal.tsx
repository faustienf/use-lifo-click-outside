import { FC, PropsWithChildren, useRef } from "react";
import { useLifoClickOutside } from "../../src";
import { Portal } from "../portal";

import "./modal.css";

type Props = {
  onClose: () => void;
};

export const Modal: FC<PropsWithChildren<Props>> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLifoClickOutside(ref, onClose);

  return (
    <Portal>
      <div ref={ref} className="modal">
        <div className="modal-header">
          <h5 className="modal-placeholder-title" />
          <button
            type="button"
            className="modal-placeholder-close"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </Portal>
  );
};
