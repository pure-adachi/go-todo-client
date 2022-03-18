import React, { memo } from "react";
import Todo from "../Todo";
import { Todo as TodoType } from "../../../types";

interface Props {
  todos: TodoType[];
}

const TodoList = ({ todos }: Props) => {
  // レンダリングされているか分かりやすくする場合
  console.log("rendered TodoList component");
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.ID} todo={todo} />
      ))}
    </div>
  );
};

export default memo(TodoList);
