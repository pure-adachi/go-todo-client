import { useReducer } from "react";
import {
  AddTodoMutation,
  UpdateTodoMutation,
  DeleteTodoMutation,
} from "../../types";
import { baseUrl } from "../../requester";

export const useAddTodoMutation = ({
  update,
}: AddTodoMutation.MutationOption): [
  AddTodoMutation.SubmitFunc,
  AddTodoMutation.State
] => {
  const initialState: AddTodoMutation.State = {
    loading: false,
  };

  const reducer = (
    queryState: AddTodoMutation.State,
    action: AddTodoMutation.Action
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

  const submit: AddTodoMutation.SubmitFunc = ({
    variables,
  }: AddTodoMutation.SubmitOptions) => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      body: JSON.stringify(variables),
    })
      .then((response) => response.json())
      .then((data) => {
        if (update) update({ data });
        dispatch({ type: "completed", data });
      });
  };

  return [submit, state];
};

export const useUpdateTodoMutation = ({
  update,
}: UpdateTodoMutation.MutationOption): [
  UpdateTodoMutation.SubmitFunc,
  UpdateTodoMutation.State
] => {
  const initialState: UpdateTodoMutation.State = {
    loading: false,
  };

  const reducer = (
    queryState: UpdateTodoMutation.State,
    action: UpdateTodoMutation.Action
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

  const submit: UpdateTodoMutation.SubmitFunc = ({
    variables: { ID, ...variables },
  }: UpdateTodoMutation.SubmitOptions) => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
    })
      .then((response) => response.json())
      .then((data) => {
        if (update) update({ data });
        dispatch({ type: "completed", data });
      });
  };

  return [submit, state];
};

export const useDeleteTodoMutation = ({
  update,
}: DeleteTodoMutation.MutationOption): [
  DeleteTodoMutation.SubmitFunc,
  DeleteTodoMutation.State
] => {
  const initialState: DeleteTodoMutation.State = {
    loading: false,
  };

  const reducer = (
    queryState: DeleteTodoMutation.State,
    { type }: DeleteTodoMutation.Action
  ) => {
    switch (type) {
      case "start":
        return { ...queryState, loading: true };
      case "completed":
        return { ...queryState, loading: false };
      default:
        return { ...initialState };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const submit: DeleteTodoMutation.SubmitFunc = ({
    variables: { ID },
  }: DeleteTodoMutation.SubmitOptions) => {
    dispatch({ type: "start" });

    fetch(`${baseUrl}/api/todos/${ID}`, {
      method: "DELETE",
    }).then(() => {
      const data = {};
      if (update) update({ data });
      dispatch({ type: "completed" });
    });
  };

  return [submit, state];
};
