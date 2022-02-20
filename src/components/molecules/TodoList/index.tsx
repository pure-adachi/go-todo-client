import React from "react";
import { useRequest } from "../../../requester";
import TodoLi from "../Todo";
import { Todo } from "../../../types";

interface Props {
  refetch: () => void;
}

interface ResponseTodosType {
  todos: Todo[];
}

const TodoList = ({ refetch }: Props) => {
  const { loading, data } = useRequest<ResponseTodosType>("/api/todos");
  const todos = data?.todos;

  if (loading || !todos) {
    return <></>;
  }

  return (
    <div className="flex justify-center text-lg my-5">
      <ol>
        {todos.map((todo, i) => (
          <TodoLi key={i} todo={todo} refetch={refetch} />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
