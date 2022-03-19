# Chapter 4: Apollo Client の useQuery みたいなフックを作る

- `Todo`リストデータの取得を、`Apollo Client`の`useQuery`みたいに出来ると、`useState`で持つような仕組みを作らなくて良い。
- `useTodosQuery`で、`loading`の状態更新や、`data`に`todos`データが入ると、自動で再レンダリングされるようにしたい。
- また、`refetch`で、再取得を行うメソッドも提供したい。
- 今回は、`react-cache`のようなキャッシュの部分は実装しません。

## `useTodosQuery`メソッドを定義する（仮）

一旦、メソッドだけ用意

- `src/requester.ts`

```diff
+export const useTodosQuery = () => {
+  const state = { loading: true, data: { todos: [] } };
+  const refetch = () => {};
+
+  return {
+    ...state,
+    refetch,
+  };
+};
```

## `useTodosQuery`メソッドを使う

- `src/components/molecules/Todos/index.tsx`

```diff
-import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
+import React, { useState, ChangeEvent, useCallback } from "react";
-import { getTodos, addTodo } from "../../../FetchRequest";
+import { addTodo } from "../../../FetchRequest";
-import { Todo } from "../../../types";
+import { useTodosQuery } from "../../../requester";
```

```diff
-const [todos, setTodos] = useState<Todo[]>([]);
 const [inputText, setInputText] = useState<string | null>();
+const {
+  loading,
+  data: { todos },
+  refetch,
+} = useTodosQuery();

-const loadTodos = useCallback(() => {
-   getTodos().then((todos) => setTodos(todos));
-}, []);
+const loadTodos = useCallback(refetch, []);

-useEffect(() => {
-   loadTodos();
-}, []);
```

```diff
-<TodoList todos={todos} loadTodos={loadTodos} />
+{loading ? (
+   "Loading..."
+) : (
+   <TodoList todos={todos} loadTodos={loadTodos} />
+)}
```

これで`Loading...`は表示されるようになった

## `useTodosQuery`メソッドを定義する

```diff
+import { useEffect, useState } from "react";
```

```diff
 export const useTodosQuery = () => {
-  const state = { loading: true, data: { todos: [] } };
+  const [state, setState] = useState({ loading: false, data: { todos: [] } });

-  const refetch = () => {};
+  const refetch = () => {
+    setState({
+      ...state,
+      loading: true,
+    });
+    fetch(`${baseUrl}/api/todos`)
+      .then((response) => response.json())
+      .then(({ todos }) => {
+        setState({
+          ...state,
+          loading: false,
+          data: { todos },
+        });
+      });
+  };

+  useEffect(() => {
+    refetch();
+  }, []);

  return {
    ...state,
    refetch,
  };
};
```

元通り動くようにはなった。

## 微妙だなと思うこと

- `loading`、`data`をそれぞれ`useState`で持つと、それぞれの状態が変更されたタイミングで、再レンダリングされてしまう。
- なので、それぞれの値を持った 1 つの連想配列としていて、`Redux`でいう、`Store`のようになっている。
- `fetch`が始まったアクション、`fetch`が終わってデータを格納するアクションで、`state`を更新しているが、複数の状態を持っているので、他のデータを更新しないよう気にしつつ、更新したいデータだけ気をつけて更新する必要があるので、アクション毎にメソッドを分けてもよかったかもしれない。
- ここまで行くと`Redux`の感覚で、アクション毎に切り分け、それぞれの状態を変更できるよな仕組みにできれば、綺麗に書けるはず！
