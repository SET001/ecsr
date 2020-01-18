import { Component, System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { epic } from './epic'
import { PositionSystemState } from '../systems'

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

export const movements: System<MovementSystemState> = {
  actions,
  reducer,
  epic,
}
