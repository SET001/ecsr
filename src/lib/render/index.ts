import { Component, System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { epic } from './epic'
import { PositionSystemState } from '../systems'
import { state } from './state'

export class RenderComponent extends Component {
  constructor(
    public mesh: any,
    public layer?: any,
  ) { super() }
}

export interface RenderEngine{
  init(...args: any[]): void
  render(): void
  addMesh(mesh: any): void
  removeMesh(mesh: any): void
}
export interface RenderSystemState{
  components: RenderComponent[]
  container: HTMLElement
  engine: RenderEngine
}
export interface RenderSystemDependencies{
  render: RenderSystemState
  position: PositionSystemState
}

export const render: System<RenderSystemState> = ({
  actions,
  reducer,
  epic,
  state,
  deps: [],
})
