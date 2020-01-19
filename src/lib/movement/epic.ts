import { combineEpics, ActionsObservable, ofType } from 'redux-observable'
import { map, filter } from 'rxjs/operators'
import { Dispatch } from '@reduxjs/toolkit'
import { MovementSystemDependencies, MovementComponent } from '.'
import { PositionComponent } from '../position/component'
import { gameTickAction, gameAddComponentAction, GameAddComponentAction } from '../game/actions'
import { positionBulkUpdateAction } from '../position/actions'
import { movementsAddAction } from './actions'

import { Action } from '..'

export const gameAddComponentEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameAddComponentAction.type),
  filter((action: Action<GameAddComponentAction<MovementComponent>>) => action.payload.component.name === 'MovementComponent'),
  map((action) => (dispatch: Dispatch) => {
    const { component, componentID, gameID } = action.payload
    dispatch(movementsAddAction({
      ...component,
      componentID,
      gameID,
    }))
  }),
)
/**
 * test that positionBulkUpdateAction is being called with valid params
    * not empty array of valid objects
*/
export const movementsGameTickEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameTickAction.type),
  map(() => async (dispatch: Dispatch, getState: ()=>MovementSystemDependencies) => {
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
  }),
)


export const epic = combineEpics(
  gameAddComponentEpic,
  movementsGameTickEpic,
)