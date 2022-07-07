import { ComponentProps, FC } from "react";
import "./button.css";

export const Button: FC<ComponentProps<"button">> = (props) => (
  <button type="button" {...props} className="button" />
);
