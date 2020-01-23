import { System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { epic } from './epic'
import { state } from './state'

export interface GameState{
  tick: number
  gameID: number
  componentID: number
  objects: number[]
  // systems: System[]
}
export interface GameSystemDependencies{
  game: GameState
}
export const game: System<GameState> = {
  actions,
  reducer,
  epic,
  state,
  deps: [],
}
