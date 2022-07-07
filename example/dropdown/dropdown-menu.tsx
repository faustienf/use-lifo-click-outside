import { ComponentProps, FC, useRef } from "react";
import { useLifoClickOutside } from "../../src";
import "./dropdown-menu.css";

type Props = ComponentProps<"ul"> & {
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
};

export const DropdownMenu: FC<Props> = ({
  children,
  onClickOutside,
  ...props
}) => {
  const ref = useRef<HTMLUListElement>(null);
  useLifoClickOutside(ref, onClickOutside);

  return (
    <ul {...props} ref={ref} className="dropdown-menu">
      {children}
    </ul>
  );
};
