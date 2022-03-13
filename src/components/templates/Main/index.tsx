import React, { useState, useEffect, useCallback } from "react";
import AddTodoForm from "../../molecules/AddTodoForm";
import TodoList from "../../molecules/TodoList";
import { Todo } from "../../../types";
import { baseUrl } from "../../../requester";

const MainHook = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    fetch(`${baseUrl}/api/todos`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ todos }) => setTodos(todos));
  };

  return (
    <div className="flex flex-col justify-center p-10">
      <AddTodoForm refetch={useCallback(loadTodos, [])} />

      <TodoList todos={todos} refetch={useCallback(loadTodos, [])} />
    </div>
  );
};

export default MainHook;
