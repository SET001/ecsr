import { ThunkDispatch } from 'redux-thunk'

import { PositionComponent } from '../lib/components/position'
import {
  createApp, Action, PositionSystemState,
} from '../lib'
import { game, GameState } from '../lib/game'
import { position } from '../lib/position'
import {
  gameAddObject,
  // gameTickAction
} from '../lib/game/actions'
import { movement, MovementComponent, MovementSystemState } from '../lib/movement'

import * as renderActions from '../lib/render/actions'
import { render, PixiRenderSystemState } from '../lib/render'
import { config } from './config'


// export type RootState = RenderSystemDependencies & GameSystemDependencies


export interface RootState{
  game: GameState
  position: PositionSystemState
  movements: MovementSystemState
  render: PixiRenderSystemState
}

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

(async () => {
  const app = createApp({
    game, position, movement, render,
  }, config)
  // app.run()
  const state = app.store.getState()
  console.log({ state })
  const obj = {
    position: new PositionComponent(),
    movement: new MovementComponent(),
  }
  // (app.store.getState() as RootState).
  await app.store.dispatch(renderActions.updateSystemAction({
    container: document.getElementById('viewport'),
  }))
  await app.store.dispatch(renderActions.init)
  await app.store.dispatch(renderActions.run)

  await app.store.dispatch(gameAddObject(obj))
  // await app.store.dispatch(gameTickAction())
  // await app.store.dispatch(gameTickAction())
  // await app.store.dispatch(gameTickAction())
})()
