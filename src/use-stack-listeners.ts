import { useCallback } from 'react';

type ValueOf<T> = T[keyof T];
type ElementOf<T extends any[]> = T extends (infer U)[] ? U : never;

// eslint-disable-next-line no-undef
type EventKey = keyof GlobalEventHandlersEventMap;
// eslint-disable-next-line no-undef
type Events<EK extends EventKey[]> = ValueOf<Pick<GlobalEventHandlersEventMap, ElementOf<EK>>>;

type Next = () => true;
type Stop = () => false;
type Listener<EK extends EventKey[] = EventKey[]> = (
  next: Next,
  event: Events<EK>
) => boolean | void;

// helpers for breaking loop .every()
const next: Next = () => true;
const stop: Stop = () => false;

const listeners: Listener[] = [];

const addListener = <L extends Listener>(newListener: L): void => {
  listeners.unshift(newListener);
};

const removeListener = <L extends Listener>(targetListener: L): void => {
  listeners.every((listener, index) => {
    if (listener === targetListener) {
      listeners.splice(index, 1);
      return stop();
    }

    return next();
  });
};

const scheduler = <EK extends EventKey[]>(event: Events<EK>): void => {
  listeners.every((listener) => listener(next, event));
};

const subscribeOnce = <EK extends EventKey[]>(events: EK): void => {
  if (!listeners.length) {
    events.forEach((event) => {
      window.addEventListener(event, scheduler);
    });
  }
};

const unsubscribeOnce = <EK extends EventKey[]>(events: EK): void => {
  if (!listeners.length) {
    events.forEach((event) => {
      window.removeEventListener(event, scheduler);
    });
  }
};

export const useStackListeners = () => useCallback(
  <EK extends EventKey[], C extends Listener<EK>>(events: EK, callback: C) => {
    subscribeOnce(events);

    addListener(callback);

    return () => {
      removeListener(callback);
      unsubscribeOnce(events);
    };
  },
  [],
);
