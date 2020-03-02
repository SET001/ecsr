import { System } from '..'
import * as actions from './actions'
import { reducer } from './reducer'
import { PositionSystemState } from '../systems'
import { state } from './state'
import { gameAddComponentAction } from '../game/actions'
import { matchComponent } from '../utils'


export const position: System<PositionSystemState> = {
  actions,
  reducer,
  state,
  deps: [],
  subscriptions: {
    [gameAddComponentAction.type]: matchComponent('PositionComponent', actions.addPosition),
  },
}
