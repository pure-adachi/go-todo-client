import { Todo } from "../types";

export const baseUrl = process.env.REACT_APP_SERVER_URL;

export function getTodos(): Promise<Todo[]> {
  return fetch(`${baseUrl}/api/todos`)
    .then((response) => response.json())
    .then(({ todos }) => todos);
}

export function addTodo(Title: string): Promise<Todo> {
  return fetch(`${baseUrl}/api/todos`, {
    method: "POST",
    body: JSON.stringify({ Title }),
  }).then((response) => response.json());
}

export function updateTodo(ID: number, Title: string): Promise<Todo> {
  return fetch(`${baseUrl}/api/todos/${ID}`, {
    method: "PATCH",
    body: JSON.stringify({ ID, Title }),
  }).then((response) => response.json());
}

export function deleteTodo(ID: number): Promise<void> {
  return fetch(`${baseUrl}/api/todos/${ID}`, {
    method: "DELETE",
  }).then();
}
