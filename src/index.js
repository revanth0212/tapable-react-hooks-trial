import React, { useState, useCallback, useEffect } from "react";
import { SyncHook } from "tapable";

import ReactDOM from "react-dom";

const counterHook = new SyncHook();

counterHook.tap("Outside", count => {
  console.log("Outside", count);
});

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    counterHook.tap("Inside", count => {
      console.log("Inside", count);
    });
  }, []);

  const addCount = useCallback(() => {
    setCounter(counter + 1);
    counterHook.call(counter + 1);
  }, [counter, setCounter]);

  const reduceCount = useCallback(() => {
    setCounter(counter - 1);
    counterHook.call(counter - 1);
  }, [counter, setCounter]);

  return [counter, { addCount, reduceCount }];
};

function App() {
  const [counter, { addCount, reduceCount }] = useCounter();
  return (
    <div>
      <button onClick={reduceCount}>-</button>
      <p>{counter}</p>
      <button onClick={addCount}>+</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
