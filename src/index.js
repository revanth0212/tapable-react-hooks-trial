import React, { useState, useCallback, useEffect } from "react";
import { logCount as counterHook, manipulateCount } from "./tapableHooks";

import ReactDOM from "react-dom";

counterHook.tap("logger", count => {
  console.log("logger", count);
});

manipulateCount.tap("checking on count outside", count => {
  console.log("checking outside", count);
  return count + 5;
});

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    manipulateCount.tap("adding 2 to count", count => {
      setCounter(count);
    });
  }, []);

  const addCount = useCallback(() => {
    const newCount = counter + 1;
    counterHook.call(newCount);
    manipulateCount.call(newCount);
  }, [counter]);

  const reduceCount = useCallback(() => {
    const newCount = counter - 1;
    counterHook.call(newCount);
    manipulateCount.call(newCount);
  }, [counter]);

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
