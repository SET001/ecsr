import { ThunkDispatch } from 'redux-thunk'

import {
  createApp, Action, PositionSystemState,
} from '../lib'
import { game, GameState } from '../lib/game'
import { position } from '../lib/position'
import { movement, MovementSystemState } from '../lib/movement'

import { render, RenderSystemState } from '../lib/render'
import { config } from './config'
import { createCreature } from './creature/actions'


// export type RootState = RenderSystemDependencies & GameSystemDependencies


export interface RootState{
  game: GameState
  position: PositionSystemState
  movement: MovementSystemState
  render: RenderSystemState
}

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

(async () => {
  const app = createApp({
    game, position, movement, render,
  }, config)
  // app.run()
  const state = app.store.getState()
  console.log({ state })
  // const obj = {
  //   position: new PositionComponent(),
  //   movement: new MovementComponent(),
  // }
  await app.init()
  app.store.dispatch(createCreature({}))

  // await app.store.dispatch(renderActions.init)
  // // (app.store.getState() as RootState).
  // await app.store.dispatch(renderActions.updateSystemAction({
  //   container: document.getElementById('viewport'),
  // }))

  // await app.store.dispatch(renderActions.run)

  // await app.store.dispatch(gameAddObject(obj))
  // await app.store.dispatch(gameTickAction())
  // await app.store.dispatch(gameTickAction())
  // await app.store.dispatch(gameTickAction())
})()
