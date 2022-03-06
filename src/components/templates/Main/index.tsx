import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { Todo } from "../../../types";
import { baseUrl } from "../../../requester";

const MainHook = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoInputText, setNewTodoInputText] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    fetch(`${baseUrl}/api/todos`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ todos }) => setTodos(todos));
  };

  const handleChangeNewTodoInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoInputText(e.currentTarget.value);
  };

  const handleKeyPressNewTodoInputText = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") return;

    addTodo();
  };

  const handleChangeEditTodoInputText = (
    ID: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTodos(
      todos.map((todo) => {
        if (todo.ID === ID) {
          return {
            ...todo,
            Title: e.currentTarget.value,
          };
        } else {
          return todo;
        }
      })
    );
  };

  const addTodo = () => {
    if (!newTodoInputText) return;

    fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        Title: newTodoInputText,
      }),
    }).then(() => {
      setNewTodoInputText(null);
      loadTodos();
    });
  };

  const updateTodo = (ID: number) => {
    const todo = todos.find((todo) => todo.ID === ID);

    if (!todo) return;

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "PATCH",
      body: JSON.stringify({
        Title: todo.Title,
      }),
    }).then(() => {
      alert("The save was successful.");
      loadTodos();
    });
  };

  const deleteTodo = (ID: number) => {
    if (!window.confirm("Do you want to delete it?")) return;

    const todo = todos.find((todo) => todo.ID === ID);

    if (!todo) return;

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "DELETE",
    }).then(() => {
      alert("It has been deleted.");
      loadTodos();
    });
  };

  console.log("render MainHook");

  return (
    <div className="flex flex-col justify-center p-10">
      <div className="flex justify-center text-lg my-5">
        <InputText
          className="border-red-300"
          value={newTodoInputText || ""}
          onChange={handleChangeNewTodoInputText}
          onKeyPress={handleKeyPressNewTodoInputText}
        />
        <Button
          className="ml-3 bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newTodoInputText}
          onClick={() => addTodo()}
        >
          Add
        </Button>
      </div>

      <div className="flex justify-center text-lg my-5">
        <ol>
          {todos.map(({ ID, Title }, i) => (
            <li className="flex py-2" key={i}>
              <InputText
                className="flex-auto"
                value={Title}
                onChange={(e) => handleChangeEditTodoInputText(ID, e)}
              />
              <Button
                className="ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400"
                onClick={() => updateTodo(ID)}
              >
                Save
              </Button>
              <Button
                className="ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400"
                onClick={() => deleteTodo(ID)}
              >
                Del
              </Button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MainHook;
