import { createReducer } from 'redux-create-reducer'
import { state } from './state'
import { movementsAddAction, updateSystemAction } from './actions'
import { addFromPayload, udpateFromPayload } from '../reducers'

export const reducer: any = createReducer(state, {
  [movementsAddAction.type]: addFromPayload('objects'),
  [updateSystemAction.type]: udpateFromPayload,
})
