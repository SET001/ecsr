import { ofType, ActionsObservable } from 'redux-observable'
import { map, filter } from 'rxjs/operators'
import { Dispatch } from '@reduxjs/toolkit'
import { PositionComponent } from 'src/lib/components/position'
import { positionAddAction } from './actions'
import { gameAddComponentAction, GameAddComponentAction } from '../game/actions'
import { Action } from '../../../lib'

export const gameAddComponentEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameAddComponentAction.type),
  //  TODO avoid string usage
  filter((action: Action<GameAddComponentAction<PositionComponent>>) => action.payload.component.name === 'PositionComponent'),
  map((action) => (dispatch: Dispatch) => {
    const { component, componentID, gameID } = action.payload
    dispatch(positionAddAction({
      ...component,
      componentID,
      gameID,
    }))
  }),
)

export const epic = gameAddComponentEpic
