import React from "react";
import AddTodoForm from "../../molecules/AddTodoForm";
import TodoList from "../../molecules/TodoList";
import { useTodosQuery } from "../../../requester/query";

const MainHook = () => {
  const {
    loading,
    data: { todos },
    refetch,
  } = useTodosQuery();

  return (
    <div className="flex flex-col justify-center p-10">
      <AddTodoForm refetch={refetch} />

      {loading ? "Loading ..." : <TodoList todos={todos} refetch={refetch} />}
    </div>
  );
};

export default MainHook;
