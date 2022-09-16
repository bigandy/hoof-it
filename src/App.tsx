import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img
            src={chrome.runtime.getURL(reactLogo)}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Hoof it App</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;