import { useEffect, useReducer } from "react";
import { SampleQuery, TodosQuery } from "../../types";
import { baseUrl } from "../../requester";

export const useSampleQuery = () => {
  const initialState: SampleQuery.State = {
    loading: false,
    data: {
      message: null,
    },
  };

  const reducer = (
    queryState: SampleQuery.State,
    action: SampleQuery.Action
  ) => {
    switch (action.type) {
      case "start":
        return { ...queryState, loading: true };
      case "completed":
        return { ...queryState, loading: false, data: action.data };
      default:
        return { ...initialState };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const load = () => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/sample`)
      .then((response) => response.json())
      .then((response) => dispatch({ type: "completed", data: response }));
  };

  useEffect(() => {
    load();

    return () => {
      dispatch({ type: "init" });
    };
  }, []);

  return state;
};

export const useTodosQuery = () => {
  const initialState: TodosQuery.State = {
    loading: false,
    data: {
      todos: [],
    },
  };
  const reducer = (queryState: TodosQuery.State, action: TodosQuery.Action) => {
    switch (action.type) {
      case "start":
        return { ...queryState, loading: true };
      case "completed":
        return { ...queryState, loading: false, data: action.data };
      default:
        return { ...initialState };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = () => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/todos`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "completed", data }));
  };

  useEffect(() => {
    load();

    return () => {
      dispatch({ type: "init" });
    };
  }, []);

  return {
    ...state,
    refetch: load,
  };
};
