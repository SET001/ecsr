import { createAction } from '@reduxjs/toolkit'
// import { ThunkDispatch } from 'redux-thunk'
import { TestScheduler } from 'rxjs/testing'
import { ActionsObservable } from 'redux-observable'
import { assert } from 'chai'
import { System, Action, createSubscriptionEpic } from '.'

export const testAction = createAction<void>('game/tick')
const subscriptionFilter = (action: Action) => !!action

const subscriptionThunk = (dispatch: any) => {
  dispatch({ type: 'test' })
}
const subscriptionMapper = () => subscriptionThunk

const systemA: System = {
  state: {},
  actions: {
    init: async () =>
      new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 10) * 100)),
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

describe('App', () => {
  // describe('createSystemEpic', () => {
  //   it('should return', () => {

  //   })
  // })

  describe('createSubscriptionEpic', () => {
    it('should return subscription thunk', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const actionInput$ = hot('--a', {
          a: { type: testAction.type },
        })
        const action$ = new ActionsObservable(actionInput$)
        const epic = createSubscriptionEpic(
          systemA.subscriptions[testAction.type],
          testAction.type,
        )
        const output$ = epic(action$)
        expectObservable(output$).toBe('--a', {
          a: subscriptionThunk,
        })
      })
    })
  })
})
