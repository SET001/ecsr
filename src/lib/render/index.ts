import { Component, System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { epic } from './epic'
import { PositionSystemState } from '../systems'
import { state } from './state'

export class RenderComponent extends Component {
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
export interface RenderSystemDependencies{
  render: PixiRenderSystemState
  position: PositionSystemState
}

export const render: System<PixiRenderSystemState> = ({
  actions,
  reducer,
  epic,
  state,
  deps: [],
})
