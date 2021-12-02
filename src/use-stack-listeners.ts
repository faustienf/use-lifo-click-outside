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
type Scheduler<E extends Event = Event> = (event: E) => void;

// helpers for breaking loop .every()
const next: Next = () => true;
const stop: Stop = () => false;

const listenersMap: Record<string, Listener[]> = {};
const schedulersMap: Record<string, Scheduler> = {};

const addListener = <N extends string, L extends Listener>(
  namespace: N,
  newListener: L,
): void => {
  listenersMap[namespace].unshift(newListener);
};

const removeListener = <N extends string, L extends Listener>(
  namespace: N,
  targetListener: L,
): void => {
  listenersMap[namespace].every((listener, index) => {
    if (listener === targetListener) {
      listenersMap[namespace].splice(index, 1);
      return stop();
    }

    return next();
  });
};

const scheduler = <N extends string, EK extends EventKey[]>(
  namespace: N,
  event: Events<EK>,
): void => {
  listenersMap[namespace].every((listener) => listener(next, event));
};

const subscribeOnce = <N extends string, EK extends EventKey[]>(
  namespace: N,
  events: EK,
): void => {
  if (!schedulersMap[namespace]) {
    schedulersMap[namespace] = (event) => scheduler(namespace, event);
  }

  if (!listenersMap[namespace]) {
    listenersMap[namespace] = [];
  }

  if (!listenersMap[namespace].length) {
    events.forEach((event) => {
      window.addEventListener(event, schedulersMap[namespace]);
    });
  }
};

const unsubscribeOnce = <N extends string, EK extends EventKey[]>(
  namespace: N,
  events: EK,
): void => {
  if (listenersMap[namespace].length) {
    return;
  }

  events.forEach((event) => {
    window.removeEventListener(event, schedulersMap[namespace]);
  });

  delete listenersMap[namespace];
  delete schedulersMap[namespace];
};

export const useStackListeners = <N extends string>(namespace: N) => useCallback(
  <EK extends EventKey[], C extends Listener<EK>>(events: EK, callback: C) => {
    subscribeOnce(namespace, events);
    addListener(namespace, callback);

    return () => {
      removeListener(namespace, callback);
      unsubscribeOnce(namespace, events);
    };
  },
  [],
);
