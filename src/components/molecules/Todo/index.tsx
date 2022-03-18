import React, { useState, ChangeEvent } from "react";
import { Todo as TodoType } from "../../../types";
import { updateTodo, deleteTodo } from "../../../FetchRequest";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";

interface Props {
  todo: TodoType;
  loadTodos: () => void;
}

const Todo = ({ todo: { ID, Title }, loadTodos }: Props) => {
  const [inputText, setInputText] = useState<string | null>(Title);

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleClickUpdateTodo = () => {
    if (!inputText) return;

    updateTodo(ID, inputText).then(loadTodos);
  };

  const handleClickDeleteTodo = () => {
    if (!window.confirm("Do you want to delete it?")) return;

    deleteTodo(ID).then(loadTodos);
  };

  return (
    <div className="flex mb-4 items-center" key={ID}>
      <InputText
        className="shadow w-full mr-2"
        placeholder="Add Todo"
        value={inputText || ""}
        onChange={handleChangeInputText}
      />

      <Button
        className="
          mr-2 border-emerald-400 text-emerald-500
          hover:text-white hover:bg-emerald-400
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-emerald-400 disabled:hover:bg-white
        "
        onClick={handleClickUpdateTodo}
        disabled={Title === inputText}
      >
        Edit
      </Button>
      <Button
        className="border-red-300 text-red-400 hover:text-white hover:bg-red-300"
        onClick={handleClickDeleteTodo}
      >
        Remove
      </Button>
    </div>
  );
};

export default Todo;
