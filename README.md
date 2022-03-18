# Chapter 1: TodoList のコンポーネントをメモ化する

- `Todo`追加用の入力フォームに、入力するたびに、`TodoList`コンポーネントがレンダリングされてしまっている。
- これは、`Todos`コンポーネント内にある、`inputText`の値が、`Todo`追加用の入力フォームに値を入力するたびに、更新しており、状態が変わったことを検知した、`Todos`コンポーネントは、再レンダリングされている。
- `Todos`コンポーネント内で、`TodoList`コンポーネントをレンダリングしている為、これも再レンダリングされてしまう。
- この再レンダリングのタイミングでは、`TodoList`コンポーネントに渡している、`todos`の値に変更はない為、再レンダリングしたくない。

## `TodoList`コンポーネントをメモ化

- `src/components/molecules/TodoList/index.tsx`

```diff
-import React from "react";
+import React, { memo } from "react";

...

 const TodoList = ({ todos }: Props) => {
+  // レンダリングされているか分かりやすくする場合
+  console.log("rendered TodoList component");
   return (

...

-export default TodoList;
+export default memo(TodoList);
```
