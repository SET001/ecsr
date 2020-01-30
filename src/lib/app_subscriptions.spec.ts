import { createAction } from '@reduxjs/toolkit'
// import { ThunkDispatch } from 'redux-thunk'
import { TestScheduler } from 'rxjs/testing'
import { ActionsObservable, StateObservable, ofType } from 'redux-observable'
import { mergeMap, mapTo } from 'rxjs/operators'
import { map } from 'ramda'
import { assert } from 'chai'
import { createSystemEpic } from './createApp'
import { System, Action, createSubscriptionEpic } from '.'


export const testAction = createAction<void>('game/tick')
const subscriptionFilter = (action: Action) => !!action

const subscriptionThunk = (dispatch: any, getState: any) => {
  console.log('asdd')
  dispatch({ type: 'test' })
}
const subscriptionMapper = (action: Action) => subscriptionThunk

const systemA: System = {
  epic: null,
  state: {},
  actions: {
    init: async () => new Promise(
      (resolve) => setTimeout(resolve, Math.round(Math.random() * 10) * 100),
    ),
  },
  reducer: null,
  deps: [],
  subscriptions: {
    [testAction.type]: {
      filter: subscriptionFilter,
      map: subscriptionMapper,
    },
  },
}

const testScheduler = new TestScheduler((actual, expected) => {
  assert.deepEqual(expected, actual)
})


describe.only('App', () => {
  describe('Subscriptions', () => {
    it('should work', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const actionInput$ = hot('--a', {
          a: { type: testAction.type },
        })
        const action$ = new ActionsObservable(actionInput$)
        const epic = createSubscriptionEpic(systemA.subscriptions[testAction.type], testAction.type)
        const output$ = epic(action$, null)
        expectObservable(output$).toBe('--a', {
          a: subscriptionThunk,
        })
      })
    })
  })
})
