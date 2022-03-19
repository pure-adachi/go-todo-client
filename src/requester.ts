import { useEffect, useState } from "react";

export const baseUrl = process.env.REACT_APP_SERVER_URL;

export const useTodosQuery = () => {
  const [state, setState] = useState({ loading: false, data: { todos: [] } });

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch(`${baseUrl}/api/todos`)
      .then((response) => response.json())
      .then(({ todos }) => {
        setState({
          ...state,
          loading: false,
          data: { todos },
        });
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    ...state,
    refetch,
  };
};
