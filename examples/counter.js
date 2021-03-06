// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import createComponent, {
    update,
    SideEffectProvider
} from '../packages/react-stateful-component/src';

const add = () => ({ type: 'ADD' });

const subtract = () => ({ type: 'SUBTRACT' });

const Counter = createComponent(() => ({
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
    render: ({ state, reduce }) => (
        <div>
            <button onClick={() => reduce(add())}>+</button>
            <span>{state.counter}</span>
            <button onClick={() => reduce(subtract())}>-</button>
        </div>
    )
}));

storiesOf('Counter', module).add('Basic', () => (
    <div>
        <SideEffectProvider>
            <Counter />
        </SideEffectProvider>
    </div>
));
