import React from "react";
import Todo from "../Todo";
import { Todo as TodoType } from "../../../types";

interface Props {
  todos: TodoType[];
}

const TodoList = ({ todos }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.ID} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
