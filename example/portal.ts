import {
  FC,
  PropsWithChildren,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";

export const usePortal = (children: ReactNode): ReactPortal => {
  const ref = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(ref.current);
    return () => {
      document.body.removeChild(ref.current);
    };
  }, []);

  return createPortal(children, ref.current);
};

export const Portal: FC<PropsWithChildren<{}>> = ({ children }) =>
  usePortal(children);
