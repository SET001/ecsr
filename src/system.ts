import { Reducer } from '@reduxjs/toolkit'
// import { ThunkAction } from 'redux-thunk'
import { Action } from '.'

export interface SystemSubscription{
  filter: (action: Action)=>boolean
  map: (action: Action)=>any
}

export type SystemSubscriptions = {[key: string]: SystemSubscription}

export interface System<T = any>{
  reducer: Reducer
  actions: any //  TODO: define type
  state: T
  deps: System[]
  // components: ComponentConstructor[]
  subscriptions?: SystemSubscriptions
}
