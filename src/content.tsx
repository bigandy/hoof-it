import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

const Thing = ({ children }: { children: any }) => {
  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <Fragment>
      <h1>Aces in the hole</h1>
      {children}
    </Fragment>
  );
};

// ReactDOM.createRoot(root as HTMLElement).render(
//   <React.StrictMode>
//     <Thing>
//       <App />
//     </Thing>
//   </React.StrictMode>
// );

ReactDOM.createRoot(
  document.getElementById("crx-root") as HTMLElement
).render(
  <React.StrictMode>
    <Thing>
      <App />
    </Thing>
  </React.StrictMode>
);
