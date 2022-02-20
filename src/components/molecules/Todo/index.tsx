import React, { ChangeEvent, Component } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import { Todo as TodoType } from "../../../types";

interface Props {
  todo: TodoType;
  refetch: () => void;
}

interface State {
  inputText: string | null;
}

class Todo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputText: props.todo.Title,
    };
  }

  private handleChangeInputText(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ inputText: e.currentTarget.value });
  }

  private updateTodo() {
    if (!this.state.inputText) return;

    const url = `${process.env.REACT_APP_SERVER_URL}/api/todos/${this.props.todo.Id}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        Title: this.state.inputText,
      }),
    }).then(() => {
      this.props.refetch();
      alert("The save was successful.");
    });
  }

  private deleteTodo() {
    if (window.confirm("Do you want to delete it?")) {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/todos/${this.props.todo.Id}`;

      fetch(url, { method: "DELETE" }).then(() => {
        this.props.refetch();
        alert("It has been deleted.");
      });
    }
  }

  render() {
    return (
      <li className="flex py-2">
        <InputText
          className="flex-auto"
          value={this.state.inputText || ""}
          onChange={this.handleChangeInputText.bind(this)}
        />
        <Button
          className="ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400"
          onClick={this.updateTodo.bind(this)}
        >
          Save
        </Button>
        <Button
          className="ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400"
          onClick={this.deleteTodo.bind(this)}
        >
          Del
        </Button>
      </li>
    );
  }
}

export default Todo;
