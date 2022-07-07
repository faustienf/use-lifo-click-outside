import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { useBooleanState } from "./use-boolean-state";
import { Dropdown, DropdownItem } from "./dropdown";
import { Modal } from "./modal";
import { Button } from "./button";

const App = () => {
  const [isOpened, onOpen, onClose] = useBooleanState();

  return (
    <div className="app">
      <Button onClick={onOpen} />
      {isOpened && (
        <Modal onClose={onClose}>
          <Dropdown>
            <DropdownItem />
            <DropdownItem />
            <DropdownItem />
            <DropdownItem />
          </Dropdown>
        </Modal>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
