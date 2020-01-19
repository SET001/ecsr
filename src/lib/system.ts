import { Epic } from 'redux-observable'
import { Reducer } from '@reduxjs/toolkit'

export interface System<T = any>{
  reducer: Reducer
  epic: Epic
  actions: any //  TODO: define type
  state: T
  // components: ComponentConstructor[]
}
