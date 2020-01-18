import { createReducer } from 'redux-create-reducer'
import { PixiRenderSystemState } from './index'
import { updateSystemAction } from './actions'
import { udpateFromPayload } from '..'

export const reducer = (state: PixiRenderSystemState) => createReducer(state, {
  [updateSystemAction.type]: udpateFromPayload,
})
