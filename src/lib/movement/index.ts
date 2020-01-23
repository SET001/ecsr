import { Component, System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { epic } from './epic'
import { PositionSystemState } from '../systems'
import { state } from './state'
import { render } from '../render/index'
import { position } from '../position/index'

export interface MovementSystemState{
  objects: MovementComponent[]
  depsinits: any[]
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
  epic,
  state,
  deps: [render, position],
}
