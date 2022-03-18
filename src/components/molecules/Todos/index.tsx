import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import TodoList from "../TodoList";
import { getTodos, addTodo } from "../../../FetchRequest";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { Todo } from "../../../types";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string | null>();

  const loadTodos = useCallback(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleClickAddTodo = () => {
    if (!inputText) return;

    addTodo(inputText).then(() => {
      setInputText(null);
      loadTodos();
    });
  };

  return (
    <div>
      <div className="flex mb-4">
        <InputText
          className="shadow mr-4"
          placeholder="Add Todo"
          value={inputText || ""}
          onChange={handleChangeInputText}
        />
        <Button
          className="
            border-blue-300 text-blue-400
            hover:text-white hover:bg-blue-300
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-blue-400 disabled:hover:bg-white
          "
          onClick={handleClickAddTodo}
          disabled={!inputText}
        >
          Add
        </Button>
      </div>

      <TodoList todos={todos} loadTodos={loadTodos} />
    </div>
  );
};

export default Todos;
