import { useEffect, useReducer } from "react";
import { Todo } from "./types";

export const baseUrl = process.env.REACT_APP_SERVER_URL;

export const useTodosQuery = () => {
  interface State {
    loading: boolean;
    data: {
      todos: Todo[];
    };
  }

  const initialState: State = {
    loading: false,
    data: {
      todos: [],
    },
  };

  interface Action {
    type: "init" | "start" | "finish";
    data?: {
      todos: Todo[];
    };
  }

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "start":
        return { ...state, loading: true };
      case "finish":
        return {
          ...state,
          loading: false,
          data: { todos: action.data?.todos || [] },
        };
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const refetch = () => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/todos`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "finish", data }));
  };

  useEffect(() => {
    refetch();

    return () => dispatch({ type: "init" });
  }, []);

  return {
    ...state,
    refetch,
  };
};
