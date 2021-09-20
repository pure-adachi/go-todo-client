import React from "react";
import Header from "./components/atoms/Header";
import Main from "./components/templates/Main";

function App() {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-100">
      <Header />
      <Main />
    </div>
  );
}

export default App;
