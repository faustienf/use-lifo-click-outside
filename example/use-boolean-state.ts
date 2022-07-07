import { useState } from "react";

export const useBooleanState = (initialFlag = false) => {
  const [flag, setFlag] = useState(initialFlag);

  return [
    flag,
    () => setFlag(true),
    () => setFlag(false),
    () => setFlag((state) => !state)
  ] as const;
};
