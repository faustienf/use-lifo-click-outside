[<img src="https://raw.githubusercontent.com/faustienf/use-on-click-outside/main/public/layers.png" width="300">](https://faustienf.github.io/use-on-click-outside/?path=/story/example-layer--regular)
# useOnClickOutside()

React hook for track click outside element. [Demo](https://faustienf.github.io/use-on-click-outside/?path=/story/example-layer--regular)

## Features
- using stack of listeners instead of queue
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

useOnClickOutside(modalRef, onModalClose);
useOnClickOutside(selectOptionsRef, onSelectOptionsClose);

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
