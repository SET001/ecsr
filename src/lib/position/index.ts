import { System } from '..'
import * as actions from './actions'
import { reducer, defaultState } from './reducer'
import { PositionSystemState } from '../systems'
import { epic } from './epic'

export const position: System<PositionSystemState> = {
  actions,
  reducer,
  defaultState,
  epic,
}
