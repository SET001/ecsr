import { PositionComponent } from '../lib/components/position'
import { createApp, PositionSystemState } from '../lib'
import { game, GameState } from '../lib/game'
import { position } from '../lib/position'
import { gameAddObject, gameTickAction } from '../lib/game/actions'
import { movements, MovementComponent } from '../lib/movements'
import { MovementSystemState, PixiRenderSystemState } from './systems'
import * as renderActions from '../lib/render/actions'
import { render } from '../lib/render'

export interface RootState {
  game: GameState
  position: PositionSystemState
  movements: MovementSystemState
  render: PixiRenderSystemState
}

(async () => {
  const app = createApp({
    game, position, movements, render
  })
  console.log('app created, running...')
  app.run()
  const obj = {
    position: new PositionComponent(),
    movements: new MovementComponent(),
  }

  await app.store.dispatch(renderActions.updateSystemAction({
    container: document.getElementById('viewport')
  }))
  await app.store.dispatch(renderActions.init)
  await app.store.dispatch(renderActions.run)

  await app.store.dispatch(gameAddObject(obj))
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
  console.log('done')
})()
