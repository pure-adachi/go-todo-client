import React from "react";
import FormAddTodo from "../../molecules/FormAddTodo";
import TodoList from "../../molecules/TodoList";

const Main = () => {
  return (
    <div className="flex flex-col justify-center p-10">
      <FormAddTodo />
      <TodoList />
    </div>
  );
};

export default Main;
