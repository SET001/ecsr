import { Component, System } from '..'
import * as actions from './actions'
import { reducer, defaultState } from './reducer'
import {epic} from './epic'

export class RenderComponent extends Component{
  mesh: any
  layer: any
}

export interface PixiRenderSystemState{
  app: PIXI.Application
  components: RenderComponent[]
  stage: PIXI.Container
  layers: PIXI.Container[]
  container: HTMLElement
}

export const render: System<PixiRenderSystemState> = {
  actions,
  reducer,
  defaultState,
  epic,
}
