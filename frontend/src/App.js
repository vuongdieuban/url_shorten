import React from "react";
import Input from "../src/components/input";
import "./App.css";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "80vw",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Input />
    </div>
  );
}

export default App;
