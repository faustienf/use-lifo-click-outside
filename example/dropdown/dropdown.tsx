import {
  ComponentProps,
  CSSProperties,
  FC,
  PropsWithChildren,
  useRef,
  MouseEvent
} from "react";
import { Button } from "../button";
import { Portal } from "../portal";
import { useBooleanState } from "../use-boolean-state";
import { DropdownMenu } from "./dropdown-menu";
import "./dropdown.css";

export const Dropdown: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isOpened, onOpenMenu, onClose] = useBooleanState();
  const positionRef = useRef<CSSProperties>({
    left: 0,
    top: 0
  });

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const { left, top, height } = e.currentTarget.getBoundingClientRect();

    positionRef.current = {
      ...positionRef.current,
      top: top + height,
      left
    };

    onOpenMenu();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <span className="dropdown-corner" />
      </Button>
      {isOpened && (
        <Portal>
          <DropdownMenu style={positionRef.current} onClickOutside={onClose}>
            {children}
          </DropdownMenu>
        </Portal>
      )}
    </>
  );
};
