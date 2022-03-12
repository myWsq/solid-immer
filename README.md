# Solid Immer

[![npm version](https://badge.fury.io/js/solid-immer.svg)](https://badge.fury.io/js/solid-immer)

A helper to use [immer](https://github.com/immerjs/immer) as [Solid.js](https://www.solidjs.co) Signal to drive state.

## Installation

```shell
$ npm install solid-immer
```

## Usage

Use `createImmerSignal` to create a immutable signal. The second value of the tuple is the updater function, which accepts an immer producer function or a value as argument.

```js
import { createImmerSignal } from "solid-immer";

function App() {
  const [todos, setTodos] = createImmerSignal([
    {
      id: "Solid.js",
      title: "Learn Solid.js",
      done: true,
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false,
    },
  ]);

  function handleToggle(id) {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  }

  function handleAdd() {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false,
      });
    });
  }

  // etc
}
```

For the full demo see [CodeSandbox](https://codesandbox.io/s/solid-immer-demo-m6nq7x).

## Note

The value of `createImmerSignal` should not be a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

```js
import { createImmerSignal } from "solid-immer";
import { createSignal } from "solid-js";

createImmerSignal("string"); // TypeError
createSignal("string"); // Good
```

