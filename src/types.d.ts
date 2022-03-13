export interface Todo {
  ID: number;
  Title: string;
}

export namespace SampleQuery {
  export interface ResponseData {
    message: string | null;
  }
  export interface State {
    loading: boolean;
    data: ResponseData;
  }
  interface NoResponseAction {
    type: "init" | "start";
  }
  interface ResponseAction {
    type: "completed";
    data: ResponseData;
  }
  export type Action = NoResponseAction | ResponseAction;
}

export namespace TodosQuery {
  export interface ResponseData {
    todos: Todo[];
  }
  export interface State {
    loading: boolean;
    data: ResponseData;
  }
  interface NoResponseAction {
    type: "init" | "start";
  }
  interface ResponseAction {
    type: "completed";
    data: ResponseData;
  }
  export type Action = NoResponseAction | ResponseAction;
}

export namespace AddTodoMutation {
  export interface State {
    loading: boolean;
  }

  export interface SubmitOptions {
    variables: {
      Title: string;
    };
  }

  export type SubmitFunc = (opt: SubmitOptions) => void;

  export interface ResponseData {
    todo: Todo;
  }

  export interface MutationOption {
    update?: (args: { data: ResponseData }) => void;
  }

  interface NoResponseAction {
    type: "start";
  }
  interface ResponseAction {
    type: "completed";
    data: ResponseData;
  }
  export type Action = NoResponseAction | ResponseAction;
}

export namespace UpdateTodoMutation {
  export interface State {
    loading: boolean;
  }

  export interface SubmitOptions {
    variables: {
      ID: number;
      Title: string;
    };
  }

  export type SubmitFunc = (opt: SubmitOptions) => void;

  export interface ResponseData {
    todo: Todo;
  }

  export interface MutationOption {
    update?: (args: { data: ResponseData }) => void;
  }

  interface NoResponseAction {
    type: "start";
  }
  interface ResponseAction {
    type: "completed";
    data: ResponseData;
  }
  export type Action = NoResponseAction | ResponseAction;
}

export namespace DeleteTodoMutation {
  export interface State {
    loading: boolean;
  }

  export interface SubmitOptions {
    variables: {
      ID: number;
    };
  }

  export type SubmitFunc = (opt: SubmitOptions) => void;

  export interface MutationOption {
    update?: (args: { data: {} }) => void;
  }

  export interface Action {
    type: "start" | "completed";
  }
}
