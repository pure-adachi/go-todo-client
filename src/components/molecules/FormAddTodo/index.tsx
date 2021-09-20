import React from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";

const FormAddTodo = () => {
  return (
    <div className="flex justify-center text-lg my-5">
      <InputText className="border-red-300" />
      <Button className="ml-3 bg-green-400">Add</Button>
    </div>
  );
};

export default FormAddTodo;
