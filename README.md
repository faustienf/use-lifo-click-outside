[<img src="https://raw.githubusercontent.com/faustienf/use-on-click-outside/main/public/layers.png" width="300">](https://faustienf.github.io/use-on-click-outside/?path=/story/example-layer--regular)
# useOnClickOutside()

React hook for track click outside element. [Demo](https://faustienf.github.io/use-on-click-outside/?path=/story/example-layer--regular)

## Features
- using stack - [useStackListeners()](https://github.com/faustienf/use-on-click-outside/blob/main/src/use-stack-listeners.ts) of listeners instead of queue
- supports several listeners with portal

## Usage

Regular usecase
```js

const ref = useRef(null);

useOnClickOutside(ref, onClose);

<Modal ref={ref} />;
```

Using several listeners with portal
```js
const modalRef = useRef(null);
const selectOptionsRef = useRef(null);

// order of calls is important! Look for useStackListeners()
/* 2nd call */ -> useOnClickOutside(modalRef, onModalClose);
/* 1st call */ -> useOnClickOutside(selectOptionsRef, onSelectOptionsClose);

<Portal>
  <Modal ref={ref}>
    <Select>
      <Portal>
        <SelectOptions ref={selectOptionsRef} />
      </Portal>
    </Select>
  </Modal>
</Portal>
```

## License
MIT
