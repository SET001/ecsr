import { createReducer } from 'redux-create-reducer'
import { PixiRenderSystemState } from './index'
import { updateSystemAction } from './actions'
import { udpateFromPayload } from '..'
import { state as defaultState } from './state'

export const reducer = createReducer<PixiRenderSystemState>(defaultState, {
  [updateSystemAction.type]: udpateFromPayload,
})
