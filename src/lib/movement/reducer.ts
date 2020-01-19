import { createReducer } from 'redux-create-reducer'
import { state } from './state'
import { movementsAddAction } from './actions'
import { addFromPayload } from '../reducers'

export const reducer = createReducer(state, {
  [movementsAddAction.type]: addFromPayload('objects'),
})
