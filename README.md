<p align="center">
  <img src="https://raw.githubusercontent.com/faustienf/use-lifo-click-outside/main/assets/demo.gif">
</p>

# ⚛️ useLifoClickOutside()

[![npm-version](https://img.shields.io/npm/v/use-lifo-click-outside.svg)](https://npmjs.org/package/use-lifo-click-outside)

📡 Detect clicks outside of elements and close components in reverse order.

## Installation

```bash
npm i use-lifo-click-outside
```

## Usage

```tsx
import { useLifoClickOutside } from 'use-lifo-click-outside';

useLifoClickOutside(ref, onClose);

<Portal>
  <Modal ref={ref}>
    ...
  </Modal>
</Portal>
```