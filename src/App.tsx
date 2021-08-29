import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRequest } from "./requester";

interface ResponseType {
  message: string;
}

function App() {
  const { loading, data } = useRequest<ResponseType>(
    "http://localhost:8000/api/sample"
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{loading ? "Loading ..." : data?.message}</p>
      </header>
    </div>
  );
}

export default App;
