import { createReducer } from 'redux-create-reducer'
import { PixiRenderSystemState } from './index'
import { updateSystemAction } from './actions'
import { udpateFromPayload } from '..'
import { state } from './state'

export const reducer = createReducer<PixiRenderSystemState>(state, {
  [updateSystemAction.type]: udpateFromPayload,
})
