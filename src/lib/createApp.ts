import {
  createStore, applyMiddleware, Store, combineReducers,
} from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import thunk from 'redux-thunk'
import {
  reject, filter, keys, all,
} from 'ramda'
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

export const store = <S>(systems: Systems, config: S): Store<S, any> => {
  const epicMiddleware = createEpicMiddleware<any, any, any, void>()
  const s = createStore<any, any, any, any>(
    combineReducers(reducer(systems)),
    config,
    applyMiddleware(
      thunk,
      epicMiddleware,
    ),
  )
  epicMiddleware.run(epic(systems))
  return s
}

type Entry<T> = [string, T]
type EntryFilter<T> = (s: T)=>boolean

type SystemEntry = Entry<System>
type SysEntryFilter = EntryFilter<SystemEntry>
// interface InitParse{
//   ready: Systems
//   pending: Systems
//   stalled: Systems
// }


export const isDepsSatisfied = (initilizedSystems: Systems) => (system: System) => {
  const f = (item: System) => Object.values(initilizedSystems).includes(item)
  return all(f)(system.deps)
}

export const init = (dispatch: any) => async (systems: Systems) => {
  console.log({ dispatch })
  let initialised:Systems = {}
  let pending = {
    ...systems,
  }
  const ff = (where: Systems) => (system: System) => Object.values(where).includes(system)
  let systemsWithAvailableDependencies: Systems = {}
  do {
    systemsWithAvailableDependencies = filter(isDepsSatisfied(initialised))(pending)
    await Promise.all(Object.entries(systemsWithAvailableDependencies).map(async ([sysName, system]:[string, System]) => {
      if (system.actions?.init) {
        await dispatch(system.actions.init())
      }
      console.log(`system ${sysName} initialised`)
    }))
    initialised = {
      ...initialised,
      ...systemsWithAvailableDependencies,
    }
    pending = reject(ff(systemsWithAvailableDependencies))(pending)
  } while (keys(systemsWithAvailableDependencies).length)
  return {
    initialised,
    pending,
  }
}

export const createApp = <S>(systems: Systems, config: S) => ({
  store: store(systems, config),
  async init() {
    const { initialised, pending } = await init(this.store.dispatch)(systems)
    if (Object.keys(pending).length) {
      console.warn(`stalling systems are ${Object.keys(pending)}`)
    }
  },
})
