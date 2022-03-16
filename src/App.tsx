import React from "react";
import Todos from "./components/molecules/Todos";

const App = () => {
  return (
    <div className="h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <div className="font-bold text-xl mb-2">TODO List</div>

        <Todos />
      </div>
    </div>
  );
};

export default App;
