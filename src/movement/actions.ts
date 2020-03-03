import { createAction, Dispatch } from '@reduxjs/toolkit'
import { MovementComponent, MovementSystemState, MovementSystemDependencies } from '.'
import { PositionComponent } from '../components'
import { positionBulkUpdateAction } from '../position/actions'
import { Action } from '..'

export const movementsAddAction = createAction<MovementComponent>('movement/add')
export const updateSystemAction = createAction<Partial<MovementSystemState>>('movement/updateSystem')

export const initialisedAction = createAction('movement/initialised')

/**
 * test that positionBulkUpdateAction is being called with valid params
    * not empty array of valid objects
*/
export const moveOnTick = () => async (
  dispatch: Dispatch,
  getState: ()=>MovementSystemDependencies,
) => {
  const { movement, position } = getState()
  const objects = movement.objects.map((obj) => ({
    move: obj,
    position: position.objects.find((o) => o.gameID === obj.gameID),
  }))
  if (objects.length) {
    const actions = objects.map<PositionComponent>(object => ({
      ...object.position,
      gameID: object.position.gameID,
      componentID: object.position.componentID,
      x: object.position.x + 1,
    }))
    await dispatch(positionBulkUpdateAction(actions as any))
  }
}

export const addComponent = (action: Action) => (dispatch: Dispatch) => {
  const { component, componentID, gameID } = action.payload
  dispatch(movementsAddAction({
    ...component,
    componentID,
    gameID,
  }))
}
