import { ThunkDispatch } from 'redux-thunk'
import { PositionComponent } from '../lib/components/position'
import {
  createApp, Action,
} from '../lib'
import { game } from '../lib/game'
import { position } from '../lib/position'
import { gameAddObject, gameTickAction } from '../lib/game/actions'
import { movements, MovementComponent } from '../lib/movements'

import * as renderActions from '../lib/render/actions'
import { render, RenderSystemDependencies } from '../lib/render'
import { config } from './config'

export interface RootState extends
  RenderSystemDependencies
  {
}
// export interface RootState extends SystemsDependensies{
//   game: GameState
//   position: PositionSystemState
//   movements: MovementSystemState
//   render: PixiRenderSystemState
// }

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

(async () => {
  const app = createApp({
    game, position, movements, render,
  }, config)
  // app.run()
  const obj = {
    position: new PositionComponent(),
    movements: new MovementComponent(),
  }
  // (app.store.getState() as RootState).
  await app.store.dispatch(renderActions.updateSystemAction({
    container: document.getElementById('viewport'),
  }))
  await app.store.dispatch(renderActions.init)
  await app.store.dispatch(renderActions.run)

  await app.store.dispatch(gameAddObject(obj))
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
})()
