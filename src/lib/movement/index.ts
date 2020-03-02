import { Component, System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { PositionSystemState } from '../systems'
import { state } from './state'
import { render } from '../render/index'
import { position } from '../position/index'
import { gameTickAction, gameAddComponentAction } from '../game/actions'
import { matchComponent } from '../utils'

export interface MovementSystemState{
  objects: MovementComponent[]
}

export class MovementComponent extends Component {
  distance: number = 0
}


export interface MovementSystemDependencies{
  movement: MovementSystemState
  position: PositionSystemState
}

export const movement: System<MovementSystemState> = {
  actions,
  reducer,
  state,
  deps: [render, position],
  subscriptions: {
    [gameTickAction.type]: {
      filter: () => true,
      map: actions.moveOnTick,
    },
    [gameAddComponentAction.type]: matchComponent('MovementComponent', actions.addComponent),
  },
}
