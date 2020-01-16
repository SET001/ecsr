import { combineEpics, ofType, ActionsObservable } from 'redux-observable'
import { gameAddComponentAction, GameAddComponentAction } from '../game/actions'
import { filter, map } from 'rxjs/operators'
import { Dispatch } from '@reduxjs/toolkit'
import { RenderComponent } from '.'
import { Action } from '../../../lib'
import { addComponent } from './actions'

export const gameAddComponentEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameAddComponentAction.type),
  //  TODO avoid string usage
  filter((action: Action<GameAddComponentAction<RenderComponent>>) => action.payload.component.name === 'RenderComponent'),
  map((action) => (dispatch: Dispatch<any>) => {
    const { component, componentID, gameID } = action.payload
    dispatch(addComponent({
      ...component,
      componentID,
      gameID,
    }))
  }),
)

export const epic = combineEpics(
  gameAddComponentEpic
)
