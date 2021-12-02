import { useEffect, RefObject } from 'react';
import { useStackListeners } from './use-stack-listeners';

const getPoint = (event: MouseEvent | TouchEvent): [number, number] => {
  const { pageX, pageY } = event instanceof MouseEvent
    ? event
    : event.touches[0];

  return [pageX, pageY];
};

const getElementsFromPoint = (pageX: number, pageY: number): Element[] => {
  const elements = 'elementsFromPoint' in document
    ? document.elementsFromPoint(pageX, pageY)
    // @ts-ignore
    : document.msElementsFromPoint(pageX, pageY);

  return Array.from(elements);
};

/**
 * @example
 * useOnClickOutside(ref, onClose)
 *
 * <Modal ref={ref}>
 *  {children}
 * </Modal>
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void,
): void => {
  const addListener = useStackListeners('click-outside');

  useEffect(
    () => addListener(
      ['mousedown', 'touchstart'],
      (next, event) => {
        const target = ref.current;
        if (!target) {
          return next(); // skip current handling and call next listener
        }

        const [pageX, pageY] = getPoint(event);
        const elements = getElementsFromPoint(pageX, pageY);

        if (!elements.includes(target)) {
          callback(event);
        }

        return undefined;
      },
    ),
    [ref, callback, addListener],
  );
};
