(this["webpackJsonpgo-todo-client"]=this["webpackJsonpgo-todo-client"]||[]).push([[0],{11:function(e,t,a){},13:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a.n(c),r=a(6),o=a.n(r),s=(a(11),a(3)),i=a(1),d="https://adachi-go-todo-api.herokuapp.com",u=function(){var e={loading:!1,data:{message:null}},t=Object(c.useReducer)((function(t,a){switch(a.type){case"start":return Object(i.a)(Object(i.a)({},t),{},{loading:!0});case"completed":return Object(i.a)(Object(i.a)({},t),{},{loading:!1,data:a.data});default:return Object(i.a)({},e)}}),e),a=Object(s.a)(t,2),n=a[0],r=a[1];return Object(c.useEffect)((function(){return r({type:"start"}),fetch("".concat(d,"/api/sample")).then((function(e){return e.json()})).then((function(e){return r({type:"completed",data:e})})),function(){r({type:"init"})}}),[]),n},l=a(0),b=function(){var e=u(),t=e.loading,a=e.data.message;return Object(l.jsx)("header",{className:"p-3 bg-red-500 text-white",children:Object(l.jsxs)("div",{className:"flex items-center",children:[Object(l.jsx)("div",{className:"text-3xl",children:"TODO APP"}),Object(l.jsx)("div",{className:"ml-5 text-xl",children:t?"Loading ...":a})]})})},j=a(4),f=["className"],O=function(e){var t=e.className,a=Object(j.a)(e,f);return Object(l.jsx)("input",Object(i.a)(Object(i.a)({},a),{},{type:"text",className:"".concat(t," border-b-2 bg-transparent px-2")}))},h=["className","disabled"],p=function(e){var t=e.className,a=e.disabled,c=Object(j.a)(e,h),n="".concat(t," text-white px-3 py-1 rounded-sm ").concat(a?"disabled:opacity-50 disabled:cursor-not-allowed":"");return Object(l.jsx)("button",Object(i.a)(Object(i.a)({},c),{},{disabled:a,className:n}))},m=["ID"],g=function(e){var t=e.refetch,a=Object(c.useState)(),n=Object(s.a)(a,2),r=n[0],o=n[1],u=function(e){var t=e.update,a={loading:!1},n=Object(c.useReducer)((function(e,t){switch(t.type){case"start":return Object(i.a)(Object(i.a)({},e),{},{loading:!0});case"completed":return Object(i.a)(Object(i.a)({},e),{},{loading:!1,data:t.data});default:return Object(i.a)({},a)}}),a),r=Object(s.a)(n,2),o=r[0],u=r[1];return[function(e){var a=e.variables;u({type:"start"}),fetch("".concat(d,"/api/todos"),{method:"POST",body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){t&&t({data:e}),u({type:"completed",data:e})}))},o]}({update:function(){o(null),t()}}),b=Object(s.a)(u,2),j=b[0],f=b[1].loading,h=function(){r&&j({variables:{Title:r}})};return Object(l.jsxs)("div",{className:"flex justify-center text-lg my-5",children:[Object(l.jsx)(O,{className:"border-red-300",value:r||"",disabled:f,onChange:function(e){o(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&h()}}),Object(l.jsx)(p,{className:"ml-3 bg-green-400",disabled:!r||f,onClick:function(){return h()},children:"Add"})]})},x=Object(c.memo)(g),v=function(e){var t=e.todo,a=t.ID,n=t.Title,r=e.refetch,o=Object(c.useState)(n),u=Object(s.a)(o,2),b=u[0],f=u[1],h=function(e){var t=e.update,a={loading:!1},n=Object(c.useReducer)((function(e,t){switch(t.type){case"start":return Object(i.a)(Object(i.a)({},e),{},{loading:!0});case"completed":return Object(i.a)(Object(i.a)({},e),{},{loading:!1,data:t.data});default:return Object(i.a)({},a)}}),a),r=Object(s.a)(n,2),o=r[0],u=r[1];return[function(e){var a=e.variables,c=a.ID,n=Object(j.a)(a,m);u({type:"start"}),fetch("".concat(d,"/api/todos/").concat(c),{method:"PATCH",body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){t&&t({data:e}),u({type:"completed",data:e})}))},o]}({update:function(){alert("The save was successful."),r()}}),g=Object(s.a)(h,2),x=g[0],v=g[1].loading,y=function(e){var t=e.update,a={loading:!1},n=Object(c.useReducer)((function(e,t){switch(t.type){case"start":return Object(i.a)(Object(i.a)({},e),{},{loading:!0});case"completed":return Object(i.a)(Object(i.a)({},e),{},{loading:!1});default:return Object(i.a)({},a)}}),a),r=Object(s.a)(n,2),o=r[0],u=r[1];return[function(e){var a=e.variables.ID;u({type:"start"}),fetch("".concat(d,"/api/todos/").concat(a),{method:"DELETE"}).then((function(){t&&t({data:{}}),u({type:"completed"})}))},o]}({update:function(){alert("It has been deleted."),r()}}),N=Object(s.a)(y,2),w=N[0],T=N[1].loading,D=n===b||!b||v||T;return Object(l.jsxs)("li",{className:"flex py-2",children:[Object(l.jsx)(O,{className:"flex-auto",placeholder:n,value:b||"",disabled:v||T,onChange:function(e){f(e.currentTarget.value)}}),Object(l.jsx)(p,{className:"ml-5 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400",onClick:function(){b&&x({variables:{ID:a,Title:b}})},disabled:D,children:"Save"}),Object(l.jsx)(p,{className:"ml-2 border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400",onClick:function(){window.confirm("Do you want to delete it?")&&w({variables:{ID:a}})},disabled:v||T,children:"Del"})]})},y=function(e){var t=e.todos,a=e.refetch;return Object(l.jsx)("div",{className:"flex justify-center text-lg my-5",children:Object(l.jsx)("ol",{children:t.map((function(e,t){return Object(l.jsx)(v,{todo:e,refetch:a},t)}))})})},N=Object(c.memo)(y),w=function(){var e=function(){var e={loading:!1,data:{todos:[]}},t=Object(c.useReducer)((function(t,a){switch(a.type){case"start":return Object(i.a)(Object(i.a)({},t),{},{loading:!0});case"completed":return Object(i.a)(Object(i.a)({},t),{},{loading:!1,data:a.data});default:return Object(i.a)({},e)}}),e),a=Object(s.a)(t,2),n=a[0],r=a[1],o=function(){r({type:"start"}),fetch("".concat(d,"/api/todos")).then((function(e){return e.json()})).then((function(e){return r({type:"completed",data:e})}))};return Object(c.useEffect)((function(){return o(),function(){r({type:"init"})}}),[]),Object(i.a)(Object(i.a)({},n),{},{refetch:o})}(),t=e.loading,a=e.data.todos,n=e.refetch;return Object(l.jsxs)("div",{className:"flex flex-col justify-center p-10",children:[Object(l.jsx)(x,{refetch:n}),t?"Loading ...":Object(l.jsx)(N,{todos:a,refetch:n})]})};var T=function(){return Object(l.jsxs)("div",{className:"flex flex-col min-h-screen h-full bg-gray-100",children:[Object(l.jsx)(b,{}),Object(l.jsx)(w,{})]})},D=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,14)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),c(e),n(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(T,{})}),document.getElementById("root")),D()}},[[13,1,2]]]);
//# sourceMappingURL=main.4c2bd776.chunk.js.map