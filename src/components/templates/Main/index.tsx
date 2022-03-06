import React, { ChangeEvent, Component, KeyboardEvent } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { baseUrl } from "../../../requester";
import { Todo } from "../../../types";

interface State {
  newTodoInputText: string | null;
  todos: Todo[];
}

class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      newTodoInputText: null,
      todos: [],
    };
  }

  componentDidMount() {
    this.loadTodos();
  }

  private loadTodos() {
    fetch(`${baseUrl}/api/todos`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ todos }) => {
        this.setState({ todos });
      });
  }

  private handleChangeNewTodoInputText(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodoInputText: e.currentTarget.value });
  }

  private handleKeyPressNewTodoInputText(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    this.addTodo();
  }

  private handleChangeEditTodoInputText(
    ID: number,
    e: ChangeEvent<HTMLInputElement>
  ) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.ID === ID) {
          return {
            ...todo,
            Title: e.currentTarget.value,
          };
        } else {
          return todo;
        }
      }),
    });
  }

  private addTodo() {
    if (!this.state.newTodoInputText) return;

    fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        Title: this.state.newTodoInputText,
      }),
    }).then(() => {
      this.setState({ newTodoInputText: null });
      this.loadTodos();
    });
  }

  private updateTodo(ID: number) {
    const todo = this.state.todos.find((todo) => todo.ID === ID);

    if (!todo) return;

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "PATCH",
      body: JSON.stringify({
        Title: todo.Title,
      }),
    }).then(() => {
      alert("The save was successful.");
      this.loadTodos();
    });
  }

  private deleteTodo(ID: number) {
    if (!window.confirm("Do you want to delete it?")) return;

    const todo = this.state.todos.find((todo) => todo.ID === ID);

    if (!todo) return;

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "DELETE",
    }).then(() => {
      alert("It has been deleted.");
      this.loadTodos();
    });
  }

  render() {
    return (
      <div className="flex flex-col justify-center p-10">
        <div className="flex justify-center text-lg my-5">
          <InputText
            className="border-red-300"
            value={this.state.newTodoInputText || ""}
            onChange={this.handleChangeNewTodoInputText.bind(this)}
            onKeyPress={this.handleKeyPressNewTodoInputText.bind(this)}
          />
          <Button
            className="ml-3 bg-green-400"
            onClick={this.addTodo.bind(this)}
          >
            Add
          </Button>
        </div>

        <div className="flex justify-center text-lg my-5">
          <ol>
            {this.state.todos.map((todo, i) => (
              <li className="flex py-2" key={i}>
                <InputText
                  className="flex-auto"
                  value={todo.Title}
                  onChange={(e) =>
                    this.handleChangeEditTodoInputText(todo.ID, e)
                  }
                />
                <Button
                  className="ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400"
                  onClick={() => this.updateTodo(todo.ID)}
                >
                  Save
                </Button>
                <Button
                  className="ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400"
                  onClick={() => this.deleteTodo(todo.ID)}
                >
                  Del
                </Button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Main;
