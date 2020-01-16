import { Component } from './component'

export type ComponentConstructor = {new(): Component}

export class Action<T = any> {
  type: string
  payload?: T
}

export * from './reducers'
export * from './system'
export * from './systems'
export * from './component'
export * from './createApp'

export * from './render'
export * from './position'
export * from './game'
export * from './movements'