import { useEffect, RefObject } from 'react';

type Listener = (event: MouseEvent | TouchEvent) => boolean;

// using for .some()
const next = () => false;
const stop = () => true;

const listeners: Listener[] = [];

const addListener = (newListener: Listener): void => {
  listeners.unshift(newListener);
};

const removeListener = (targetListener: Listener) => {
  listeners.some((listener, index) => {
    if (listener === targetListener) {
      listeners.splice(index, 1);
      return stop();
    }

    return next();
  });
};

const scheduler = (event: MouseEvent | TouchEvent): void => {
  listeners.some((listener) => listener(event));
};

const sunbscribeOnce = () => {
  if (!listeners.length) {
    window.addEventListener('mousedown', scheduler);
    window.addEventListener('touchstart', scheduler);
  }
};

const unsunbscribeOnce = () => {
  if (!listeners.length) {
    window.removeEventListener('mousedown', scheduler);
    window.removeEventListener('touchstart', scheduler);
  }
};

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

  return elements;
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
  useEffect(
    () => {
      sunbscribeOnce();

      const handler = (event: MouseEvent | TouchEvent): boolean => {
        const target = ref.current;
        if (!target) {
          return next();
        }

        const [pageX, pageY] = getPoint(event);
        const elements = getElementsFromPoint(pageX, pageY);

        if (!elements.includes(target)) {
          callback(event);
        }

        return stop();
      };

      addListener(handler);

      return () => {
        removeListener(handler);
        unsunbscribeOnce();
      };
    },
    [ref, callback],
  );
};
