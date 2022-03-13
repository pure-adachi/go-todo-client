import React, { memo } from "react";
import TodoLi from "../../molecules/TodoLi";
import { Todo } from "../../../types";

interface Props {
  todos: Todo[];
  refetch: () => void;
}

const TodoList = ({ todos, refetch }: Props) => {
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

export default memo(TodoList);
