import React, { ChangeEvent, Component } from "react";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";

interface Props {
  refetch: () => void;
}

interface State {
  inputText: string | null;
}

class FormAddTodo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputText: null,
    };
  }

  private handleChangeInputText(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ inputText: e.currentTarget.value });
  }

  private addTodo() {
    if (!this.state.inputText) return;

    const url = `${process.env.REACT_APP_SERVER_URL}/api/todos`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Title: this.state.inputText,
      }),
    }).then(() => {
      this.setState({ inputText: null });
      this.props.refetch();
    });
  }

  render() {
    return (
      <div className="flex justify-center text-lg my-5">
        <InputText
          className="border-red-300"
          value={this.state.inputText || ""}
          onChange={this.handleChangeInputText.bind(this)}
        />
        <Button className="ml-3 bg-green-400" onClick={this.addTodo.bind(this)}>
          Add
        </Button>
      </div>
    );
  }
}

export default FormAddTodo;
