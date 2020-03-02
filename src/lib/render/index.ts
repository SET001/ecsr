import { Component, System, Action } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { PositionSystemState } from '../systems'
import { state } from './state'
import { gameAddComponentAction, GameAddComponentAction, gameTickAction } from '../game/actions'

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
  state,
  deps: [],
  subscriptions: {
    [gameAddComponentAction.type]: {
      filter: (action: Action<GameAddComponentAction>) => action.payload.component.name === 'RenderComponent',
      map: actions.addObject,
    },
    [gameTickAction.type]: {
      filter: () => true,
      map: actions.render,
    },
  },
})
