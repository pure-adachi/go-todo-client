import { useEffect, useReducer } from "react";

export const useRequest = <T>(url: string) => {
  interface StatusType {
    loading: boolean;
    data: T | null;
    error: Error | null;
  }

  interface ActionType {
    type: "init" | "start" | "data" | "error";
    data: T | null;
    error: Error | null;
  }

  const initialState: StatusType = {
    loading: false,
    error: null,
    data: null,
  };

  const reducer = (state: StatusType, { type, data, error }: ActionType) => {
    switch (type) {
      case "init":
        return { ...initialState };
      case "start":
        return { ...state, loading: true };
      case "data":
        return { ...state, loading: false, data };
      case "error":
        return { ...state, loading: false, error };
      default:
        throw new Error("no such action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let dispatchSafe = (action: any) => dispatch(action);
    const abortController = new AbortController();

    (async () => {
      dispatchSafe({ type: "start" });
      try {
        const response = await fetch(url);
        if (response.ok) {
          dispatchSafe({ type: "data", data: await response.json() });
        } else {
          const error = new Error(`Fetch failed: ${response.statusText}`);
          dispatchSafe({ type: "error", error });
        }
      } catch (error) {
        dispatchSafe({ type: "error", error });
      }
    })();

    return () => {
      dispatchSafe = () => null;
      abortController.abort();
      dispatch({ type: "init", data: null, error: null });
    };
  }, [url]);

  return state;
};
