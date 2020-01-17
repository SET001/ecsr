import {
  createStore, applyMiddleware, Store, combineReducers,
} from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import thunk from 'redux-thunk'
import { System } from './system'

type Systems = {[key: string]: System}

const reduceSystems = (fieldName: keyof System) =>
  (systems: Systems) => Object.entries(systems).reduce((
    acc: {[key: string]: any},
    [systemName, system]: [string, System],
  ) => {
    acc[systemName] = system[fieldName]
    return acc
  }, {} as any)

const epic = (systems: Systems) => {
  const epics = Object.entries(systems).map(
    ([, system]: [string, System]) => system.epic,
  )
  return combineEpics.apply(combineEpics, epics)
}

const reducer = reduceSystems('reducer')
const defaultState = reduceSystems('defaultState')

export const store = <S>(systems: Systems): Store<any, any> => {
  const epicMiddleware = createEpicMiddleware<any, any, any, void>()
  // console.log({ defaultState: defaultState(systems), reducers: reducer(systems) })
  const s = createStore<any, any, any, any>(
    combineReducers(reducer(systems)),
    defaultState(systems),
    applyMiddleware(
      thunk,
      epicMiddleware,
    ),
  )
  epicMiddleware.run(epic(systems))
  return s
}

export const createApp = (systems: Systems) => ({
  store: store(systems),
  // run() { },
})
