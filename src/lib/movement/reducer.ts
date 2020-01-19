import { createReducer } from 'redux-create-reducer'
import { MovementSystemState } from '.'
import { movementsAddAction } from './actions'
import { addFromPayload } from '../reducers'

export const defaultState: MovementSystemState = {
  objects: [],
}
export const reducer = createReducer(defaultState, {
  [movementsAddAction.type]: addFromPayload('objects'),
})
