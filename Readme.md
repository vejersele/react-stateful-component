# React Stateful Component

[![Build Status](https://travis-ci.org/vejersele/react-stateful-component.svg?branch=master)](https://travis-ci.org/vejersele/react-stateful-component)

**Warning:** This is work in progress, api's might still change.

Create stateful React components in a functional way, with side effect support. Heavily inspired by ReasonReact's api.


[Documentation](packages/react-stateful-component/Readme.md)

## Making the case for functional stateful components.

### State management

React class components aren't always easy to keep maintainable, and it gets harder as the amount of state the component is managing grows. As setState() calls get spread across multiple methods, it becomes more difficult to have a good understanding of what state changes are happening within the component.

Redux has provided us with very good solution to this problem. It uses pure reducer functions and a store to centralise your state management. However Redux also comes with some downsides when working on larger apps.

When building larger apps, you typically want to separate your app into multiple smaller apps or features. Each of these mini apps having their own responsibilities and thus their own state to manage. While Redux provides us with the ability to have separate state branches for these individual mini apps, the state still lives in the same single store. This can sometimes lead to state that gets shared and actions that get reduced by multiple mini apps, creating a dependency between different sub sections of your app. Of course this isn't always a downside, sometimes it's even desirable, but in some situations you want to enforce that separation a little bit more.

React Stateful Component allows you to do that because it's state is scoped to the component (it's just a React class component behind the scenes).

Another benefit of using component scoped state is that it can be wired on the fly. As features may live in different sub sections of your app, you don't want to wire all of your state up front. Instead you want it to be available whenever you need it. This is harder to do with Redux since it's single store requires you to setup your app's state all upfront.

### Side effects

In order to keep a component clean and testable we want to push everything that isn't related to reducing actions and managing state, into a side effect. By doing this you can easily unit test a component without having to mock api calls, timeouts, web sockets, etc ...

React Stateful Component uses a SideEffectProvider to run side effects. This means that a component will never execute side effects itself it will only schedule them.

Like in Elm and ReactReason, side effect are scheduled from within the reducer, and they are just functions. Meaning you don't have to deal with very complex side effect models.

## Code sample

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import createStatefulComponent, { update, SideEffectProvider } from 'react-stateful-component';

// Actions
const add = () => ({ type: 'ADD' });
const subtract = () => ({ type: 'SUBTRACT' });

const Counter = createStatefulComponent(() => ({
    initialState: () => ({
        counter: 0
    }),
    reducer: (state, action) => {
        const { counter } = state;

        switch (action.type) {
            case 'ADD':
                return update.state({ counter: counter + 1 });
            case 'SUBTRACT':
                return update.state({ counter: counter - 1 });
            default:
                return update.nothing();
        }
    },
    render: ({ state: {counter}, reduce }) => (
        <div>
            <button onClick={() => reduce(add())}>+</button>
            <span>{counter}</span>
            <button onClick={() => reduce(subtract())}>-</button>
        </div>
    )
}));

ReactDOM.render(
    <SideEffectProvider>
        <Counter />
    </SideEffectProvider>,
    document.getElementById('app')
);

```

## Examples

An example directory is included in this repo. You can check it out locally by running:

```
git clone https://github.com/vejersele/react-stateful-component.git
cd react-stateful-component
npm install
npm run storybook
```
this will start storybook on http://localhost:6006/

## Contributing

All contribution are more then welcome, feel free to open issues and pr's.

running tests:
```
npm test
```

Run these two commands in two separate terminal instances to re-run tests on each change:
```
npm run build:watch
npm run test:watch
```

## Inspiration

https://reasonml.github.io/reason-react/

http://elm-lang.org/

https://redux.js.org/
