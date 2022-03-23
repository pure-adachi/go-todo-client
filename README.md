# Chapter 5: useReducer を使って、useTodosQuery をリファクタリング

- `useReducer`とは、`useState`と似ていて、状態を管理する役割を持つ。
- 以下のように、状態を表す`state`とアクションを実行する関数`dispatch`を返してくれます。
  ```js
  const [state, dispatch] = useReducer(reducer, initialState);
  ```
- `reducer`は`(state, action) => newState`という関数で、`dispatch`から呼び出された際に、渡される引数が`action`
- 現在の状態である`state`に対して、`action`による、変更を加え、返すと`state`が更新され、再レンダリングされるという流れ

## useReducer を使う

- `src/requester.ts`

```diff
-import { useEffect, useState } from "react";
+import { useEffect, useReducer } from "react";
+import { Todo } from "./types";
```

```diff
-const [state, setState] = useState({ loading: false, data: { todos: [] } });
+interface State {
+  loading: boolean;
+  data: {
+    todos: Todo[];
+  };
+}

+const initialState: State = {
+  loading: false,
+  data: {
+    todos: [],
+  },
+};

+interface Action {
+  type: "init" | "start" | "finish";
+  data?: {
+    todos: Todo[];
+  };
+}

+const reducer = (state: State, action: Action) => {
+  switch (action.type) {
+    default:
+      return initialState;
+  }
+};

+const [state, dispatch] = useReducer(reducer, initialState);

 const refetch = () => {
-  setState({
-    ...state,
-    loading: true,
-  });
+  dispatch({ type: "start" });
   fetch(`${baseUrl}/api/todos`)
     .then((response) => response.json())
-    .then(({ todos }) => {
-      setState({
-        ...state,
-        loading: false,
-        data: { todos },
-      });
-    });
+    .then((data) => dispatch({ type: "finish", data }));
 };

   useEffect(() => {
     refetch();
     // unmount時にstateを初期化
+    return () => dispatch({ type: "init" });
   }, []);
```

一旦、何もアクションを受け付けていない形でできたので、`Todo`リストは表示されない

## `fetch`開始の`start`アクションを追加する

```diff
 const reducer = (state: State, action: Action) => {
    switch (action.type) {
+      case "start":
+        return { ...state, loading: true };
       default:
          return initialState;
    }
 };
```

一瞬だけ、`Loading...`が表示されるようになった

## `fetch`終了と、`data`格納のための`finish`アクションを追加する

```diff
   const reducer = (state: State, action: Action) => {
     switch (action.type) {
       case "start":
         return { ...state, loading: true };
+      case "finish":
+        return {
+          ...state,
+          loading: false,
+          data: { todos: action.data?.todos || [] },
+        };
       default:
         return initialState;
     }
   };
```

元通り動くようになった
