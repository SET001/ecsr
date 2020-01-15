import { System } from '../../../lib'
import * as actions from './actions'
import { reducer, defaultState } from './reducer'
import { epic } from './epic'

export interface GameState{
  tick: number
  gameID: number
  componentID: number
  objects: number[]
  // systems: System[]
}

export const game: System<GameState> = {
  actions,
  reducer,
  defaultState,
  epic,
}
