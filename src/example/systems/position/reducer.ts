import { createReducer } from 'redux-create-reducer'
import { Action, addFromPayload } from '../../../lib'
import { positionBulkUpdateAction, positionAddAction } from './actions'
import { PositionComponent } from '../../../lib/components/position'
import { PositionSystemState } from '../../../lib/systems'

export const defaultState: PositionSystemState = {
  objects: [],
}
export const reducer = createReducer(defaultState, {
  [positionBulkUpdateAction.type]: (
    state: PositionSystemState,
    action: Action<PositionComponent[]>,
  ) => ({
    ...state,
    objects: state.objects.length ? state.objects.map((position) => {
      const found = action.payload.find((p) => p.gameID === position.gameID)
      return found ? {
        ...position,
        ...found,
      } : position
    }) : [],
  }),
  [positionAddAction.type]: addFromPayload('objects'),
})
