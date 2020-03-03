import { createReducer } from 'redux-create-reducer'
import { Action, addFromPayload } from '..'
import { positionBulkUpdateAction, positionAddAction } from './actions'
import { PositionComponent } from '../components/position'
import { PositionSystemState } from '../systems'
import { state as defaultState } from './state'

export const reducer: any = createReducer(defaultState, {
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
