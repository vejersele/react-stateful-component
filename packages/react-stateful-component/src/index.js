// @flow

import * as update from './update';
import createComponent, { type ComponentDefinition } from './stateful-component';

export { default as SideEffectProvider } from './provider';

export * from './types';
export { update };
export type { ComponentDefinition };
export { default as context } from './context';
export default createComponent;
