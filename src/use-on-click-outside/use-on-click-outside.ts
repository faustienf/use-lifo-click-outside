import { useEffect, RefObject } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  listener: (event: MouseEvent | TouchEvent) => void,
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent): void => {
      const target = ref.current;
      if (!target) {
        return;
      }

      const { pageX, pageY } = event instanceof MouseEvent
        ? event
        : event.touches[0];

      const listNodes = 'elementsFromPoint' in document
        ? document.elementsFromPoint(pageX, pageY)
        // @ts-ignore
        : document.msElementsFromPoint(pageX, pageY);
      const nodes = Array.from(listNodes || []);

      if (!nodes.includes(target)) {
        listener(event);
      }
    };

    window.addEventListener('mousedown', handler);
    window.addEventListener('touchstart', handler);

    return () => {
      window.removeEventListener('mousedown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [ref, listener]);
};
