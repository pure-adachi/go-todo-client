# Chapter 2: 更新、削除後に、Todo 一覧を再取得する

- 現状、`Todo`のタイトルを更新した後や、削除した後は、何もしていない為、最新情報を表示するには、画面をリロードする必要がある。
- `Todos`コンポーネントに定義してある、`loadTodos`メソッドをそれぞれの処理の後に呼び出したい。
- `TodoList` → `Todo` と`loadTodos`メソッドを渡し、それぞれの処理の後で呼び出せるようにする。

## Todo コンポーネントで loadTodos メソッドを受ける準備

- `src/components/molecules/Todo/index.tsx`

```diff
 interface Props {
   todos: TodoType[];
+  loadTodos: () => void;
 }
```

## TodoList コンポーネントで loadTodos メソッドを受ける準備と、Todo コンポーネントに渡す

- `src/components/molecules/TodoList/index.tsx`

```diff
 interface Props {
   todos: TodoType[];
+  loadTodos: () => void;
 }
```

```diff
-const TodoList = ({ todos }: Props) => {
+const TodoList = ({ todos, loadTodos }: Props) => {
```

```diff
-<Todo key={todo.ID} todo={todo} />
+<Todo key={todo.ID} todo={todo} loadTodos={loadTodos} />
```

## Todos コンポーネントで、TodoList コンポーネントに loadTodos メソッドを渡す

- `src/components/molecules/Todos/index.tsx`

```diff
-<TodoList todos={todos} />
+<TodoList todos={todos} loadTodos={loadTodos} />
```

## Todo コンポーネントで loadTodos メソッドを使う（更新、削除処理後）

- `src/components/molecules/Todo/index.tsx`

```diff
-const Todo = ({ todo: { ID, Title } }: Props) => {
+const Todo = ({ todo: { ID, Title }, loadTodos }: Props) => {
```

```diff
-updateTodo(ID, inputText);
+updateTodo(ID, inputText).then(loadTodos);
```

```diff
-deleteTodo(ID);
+deleteTodo(ID).then(loadTodos);
```
