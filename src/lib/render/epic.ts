import { combineEpics, ofType, ActionsObservable } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import {
  gameAddComponentAction,
  GameAddComponentAction,
} from '../game/actions'
import { RenderComponent } from '.'
import { addObject } from './actions'
import { Action } from '..'

export const gameAddComponentEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameAddComponentAction.type),
  //  TODO avoid string usage
  filter((action: Action<GameAddComponentAction<RenderComponent>>) => action.payload.component.name === 'RenderComponent'),
  map(addObject),
)

export const epic = combineEpics(
  gameAddComponentEpic,
)
