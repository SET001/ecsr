import { Component, System } from '../../../lib'
import * as actions from './actions'
import { reducer, defaultState } from './reducer'
import { epic } from './epic'

export interface MovementSystemState{
  objects: MovementComponent[]
}

export class MovementComponent extends Component {
  distance: number = 0
}

export const movements: System<MovementSystemState> = {
  actions,
  defaultState,
  reducer,
  epic,
}
