import React from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { useRequest } from "../../../requester";

interface Todo {
  Id: number;
  Title: string;
}

interface ResponseTodosType {
  todos: Todo[];
}

const TodoList = () => {
  const { loading, data } = useRequest<ResponseTodosType>("/api/todos");
  const todos = data?.todos;

  if (loading || !todos) {
    return <></>;
  }

  return (
    <div className="flex justify-center text-lg my-5">
      <ol>
        {todos.map(({ Id, Title }) => (
          <li key={Id} className="flex py-2">
            <InputText className="flex-auto" defaultValue={Title} />
            <Button className="ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400">
              Save
            </Button>
            <Button className="ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400">
              Del
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
