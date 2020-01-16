import * as PIXI from 'pixi.js'
import { createReducer } from 'redux-create-reducer'
import { PixiRenderSystemState } from '.'
import {updateSystemAction} from './actions'
import { udpateFromPayload } from '..'

export const defaultState: PixiRenderSystemState = {
  app: new PIXI.Application(),
  components: [],
  container: null,
  stage: new PIXI.Container(),
  layers: []
}

export const reducer = createReducer(defaultState, {
  [updateSystemAction.type]: udpateFromPayload
})