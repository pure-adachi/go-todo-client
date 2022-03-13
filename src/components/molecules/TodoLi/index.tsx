import React, { useState, ChangeEvent } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { Todo } from "../../../types";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../../requester/mutation";

interface Props {
  todo: Todo;
  refetch: () => void;
}

const TodoLi = ({ todo: { ID, Title }, refetch }: Props) => {
  const [inputText, setInputText] = useState<string | null>(Title);
  const [updateTodoSubmit, { loading: loadingUpdate }] = useUpdateTodoMutation({
    update: () => {
      alert("The save was successful.");
      refetch();
    },
  });
  const [deleteTodoSubmit, { loading: loadingDelete }] = useDeleteTodoMutation({
    update: () => {
      alert("It has been deleted.");
      refetch();
    },
  });

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const updateTodo = () => {
    if (!inputText) return;

    updateTodoSubmit({
      variables: {
        ID,
        Title: inputText,
      },
    });
  };

  const deleteTodo = () => {
    if (!window.confirm("Do you want to delete it?")) return;

    deleteTodoSubmit({
      variables: { ID },
    });
  };

  const isDisabledUpdate =
    Title === inputText || !inputText || loadingUpdate || loadingDelete;

  return (
    <li className="flex py-2">
      <InputText
        className="flex-auto"
        placeholder={Title}
        value={inputText || ""}
        disabled={loadingUpdate || loadingDelete}
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
        disabled={loadingUpdate || loadingDelete}
      >
        Del
      </Button>
    </li>
  );
};

export default TodoLi;
