import {
  createStore, applyMiddleware, Store, combineReducers,
} from '@reduxjs/toolkit'
import {
  createEpicMiddleware, combineEpics, ActionsObservable, ofType, StateObservable,
} from 'redux-observable'
import thunk from 'redux-thunk'
import {
  reject, filter, keys, all,
} from 'ramda'
import { map, filter as rxfilter } from 'rxjs/operators'
import { System, SystemSubscription } from './system'

type Systems = {[key: string]: System}

export const createSubscriptionEpic = (subscription: SystemSubscription, action: string) =>
  ($action: ActionsObservable<any>, $state: StateObservable<any>) => $action.pipe(
    ofType(action),
    rxfilter(subscription.filter),
    map(subscription.map),
  )


export const createSystemEpic = (system: System) => {
  const epics = Object.entries(system.subscriptions).map(
    ([action, subscription]) => createSubscriptionEpic(subscription, action),
  )
  return combineEpics(...epics)
}

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
    ([, system]) => createSystemEpic(system),
  )
  return combineEpics(...epics)
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

interface InitResult{
  ready: Systems
  pending: Systems
}


export const isDepsSatisfied = (initilizedSystems: Systems) => (system: System) => {
  const f = (item: System) => Object.values(initilizedSystems).includes(item)
  return all(f)(system.deps)
}

export const init = (dispatch: any) => async (systems: Systems): Promise<InitResult> => {
  let ready:Systems = {}
  let pending = {
    ...systems,
  }
  const ff = (where: Systems) => (system: System) => Object.values(where).includes(system)
  let systemsWithAvailableDependencies: Systems = {}
  /* eslint-disable no-await-in-loop */
  // TODO: refactor this to avoid usage of do-while loop and increase testability of this code
  do {
    systemsWithAvailableDependencies = filter(isDepsSatisfied(ready))(pending)
    await Promise.all(
      Object.entries(systemsWithAvailableDependencies).map(
        async ([sysName, system]:[string, System]) => {
          if (system.actions?.init) {
            await dispatch(system.actions.init())
          }
          //  TODO: made this output only in dev env
          /* eslint-disable no-console */
          console.log(`system ${sysName} initialised`)
        },
      ),
    )
    ready = {
      ...ready,
      ...systemsWithAvailableDependencies,
    }
    pending = reject(ff(systemsWithAvailableDependencies))(pending)
  } while (keys(systemsWithAvailableDependencies).length)
  return {
    ready,
    pending,
  }
}

export const createApp = <S>(systems: Systems, config: S) => ({
  store: store(systems, config),
  async init() {
    const { pending } = await init(this.store.dispatch)(systems)
    if (Object.keys(pending).length) {
      console.warn(`stalling systems are ${Object.keys(pending)}`)
    }
  },
})
