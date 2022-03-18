# Chapter 3: TodoList コンポーネントに渡す loadTodos 関数をメモ化する

- `TodoList`コンポーネントに`loadTodos`メソッドを渡すようにしたことで、追加用の入力フォームに値を入力するたびに、`TodoList`コンポーネントが再レンダリングされるようになってしまった。
- これは、`Todos` コンポーネント内にある、`inputText` の値が、`Todo` 追加用の入力フォームに値を入力するたびに、更新しており、状態が変わったことを検知した、`Todos` コンポーネントは、再レンダリングされ、そのタイミングで、`loadTodos`関数も新しく作り直される。
- `loadTodos`関数が新しくなっているので、`TodoList`は、渡している値に変更があると判断し、`TodoList`コンポーネントが再レンダリングされてしまう。
- この再レンダリングのタイミングでは、`TodoList`コンポーネントを再レンダリングしたくない。

## `loadTodos`関数をメモ化

- `src/components/molecules/TodoList/index.tsx`

```diff
-import React, { useEffect, useState, ChangeEvent } from "react";
+import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
```

```diff
-const loadTodos = () => {
+const loadTodos = useCallback(() => {
   getTodos().then((todos) => setTodos(todos));
-});
+}, []);
```
