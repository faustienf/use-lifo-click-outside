import { RefObject } from "react";
import { createSubscriptionStackHook } from "subscription-stack/react";

const getPoint = (event: MouseEvent | TouchEvent): [number, number] => {
  const { clientX, clientY } =
    event instanceof MouseEvent ? event : event.touches[0];

  return [clientX, clientY];
};

const getElementsFromPoint = ([pointX, pointY]: [
  number,
  number
]): Element[] => {
  const elements =
    "elementsFromPoint" in document
      ? document.elementsFromPoint(pointX, pointY)
      : // @ts-ignore
        document.msElementsFromPoint(pointX, pointY);

  return Array.from(elements);
};

const isClickedOutside = (
  target: HTMLElement,
  event: MouseEvent | TouchEvent
): boolean => {
  const elements = getElementsFromPoint(getPoint(event));
  return !elements.includes(target);
};

const useLifoClick = createSubscriptionStackHook();

/**
 * @example
 * useLifoClickOutside(ref, onClose)
 *
 * <Modal ref={ref}>
 *  {children}
 * </Modal>
 */
export const useLifoClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void
): void => {
  useLifoClick(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = ref.current;
      if (!target) {
        return;
      }

      event.stopImmediatePropagation();
      if (isClickedOutside(target, event)) {
        callback(event);
      }
    };

    window.addEventListener("mousedown", handler);
    window.addEventListener("touchstart", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("touchstart", handler);
    };
  });
};
