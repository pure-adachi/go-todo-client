import React, { useState } from "react";
import FormAddTodo from "../../molecules/FormAddTodo";
import TodoList from "../../molecules/TodoList";

const Main = () => {
  const [key, updateKey] = useState(0);

  const refetch = () => {
    updateKey(key + 1);
  };

  return (
    <div className="flex flex-col justify-center p-10">
      <FormAddTodo refetch={refetch} />
      <TodoList key={key} refetch={refetch} />
    </div>
  );
};

export default Main;
