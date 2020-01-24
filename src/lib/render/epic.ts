import { combineEpics, ofType, ActionsObservable } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { gameAddComponentAction, GameAddComponentAction } from '../game/actions'
import { RenderComponent } from '.'
import { Action } from '..'

export const gameAddComponentEpic = ($action: ActionsObservable<any>) => $action.pipe(
  ofType(gameAddComponentAction.type),
  //  TODO avoid string usage
  filter((action: Action<GameAddComponentAction<RenderComponent>>) => action.payload.component.name === 'RenderComponent'),
  map((action) => {
    console.log(`RENDER SYSTEM: on ${gameAddComponentAction.type}`, action)
    return { type: 'noop' }
  }),
)

export const epic = combineEpics(
  gameAddComponentEpic,
)
