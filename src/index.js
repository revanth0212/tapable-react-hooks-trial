import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

const useCounter = () => {
  const [counter, setCounter] = useState(0);
  const addCount = useCallback(() => {
    setCounter(counter + 1);
  }, [counter, setCounter]);
  const reduceCount = useCallback(() => {
    setCounter(counter - 1);
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
