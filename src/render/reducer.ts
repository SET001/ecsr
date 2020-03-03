import { createReducer } from 'redux-create-reducer'
import { RenderSystemState } from './index'
import { updateSystemAction } from './actions'
import { udpateFromPayload } from '..'
import { state as defaultState } from './state'

export const reducer: any = createReducer<RenderSystemState>(defaultState, {
  [updateSystemAction.type]: udpateFromPayload,
})
