import React, { useState, ChangeEvent } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { Todo } from "../../../types";
import { requestUpdateTodo, requestDeleteTodo } from "../../../requester";

interface Props {
  todo: Todo;
  refetch: () => void;
}

const TodoLi = ({ todo: { ID, Title }, refetch }: Props) => {
  const [inputText, setInputText] = useState<string | null>(Title);

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const updateTodo = () => {
    if (!inputText) return;

    requestUpdateTodo(ID, inputText).then(() => {
      alert("The save was successful.");
      refetch();
    });
  };

  const deleteTodo = () => {
    if (!window.confirm("Do you want to delete it?")) return;

    requestDeleteTodo(ID).then(() => {
      alert("It has been deleted.");
      refetch();
    });
  };

  const isDisabledUpdate = Title === inputText || !inputText;

  return (
    <li className="flex py-2">
      <InputText
        className="flex-auto"
        placeholder={Title}
        value={inputText || ""}
        onChange={handleChangeInputText}
      />
      <Button
        className="ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400"
        onClick={updateTodo}
        disabled={isDisabledUpdate}
      >
        Save
      </Button>
      <Button
        className="ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400"
        onClick={deleteTodo}
      >
        Del
      </Button>
    </li>
  );
};

export default TodoLi;
