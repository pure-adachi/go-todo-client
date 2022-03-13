import React, { memo, useState, ChangeEvent, KeyboardEvent } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { requestAddTodo } from "../../../requester";

interface Props {
  refetch: () => void;
}

const AddTodoForm = ({ refetch }: Props) => {
  const [inputText, setInputText] = useState<string | null>();

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleKeyPressInputText = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    addTodo();
  };

  const addTodo = () => {
    if (!inputText) return;

    requestAddTodo(inputText).then(() => {
      setInputText(null);
      refetch();
    });
  };

  return (
    <div className="flex justify-center text-lg my-5">
      <InputText
        className="border-red-300"
        value={inputText || ""}
        onChange={handleChangeInputText}
        onKeyPress={handleKeyPressInputText}
      />
      <Button
        className="ml-3 bg-green-400"
        disabled={!inputText}
        onClick={() => addTodo()}
      >
        Add
      </Button>
    </div>
  );
};

export default memo(AddTodoForm);
