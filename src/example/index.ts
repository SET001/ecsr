import { PositionComponent } from '../lib/components/position'
import { createApp, PositionSystemState } from '../lib'
import { game, GameState } from './systems/game'
import { position } from './systems/position'
import { gameAddObject, gameTickAction } from './systems/game/actions'
import { movements, MovementComponent } from './systems/movements'
import { MovementSystemState } from './systems'
// import { render } from './systems/render'

export interface RootState {
  game: GameState
  position: PositionSystemState
  movements: MovementSystemState
  // render: RenderSystemState
}

(async () => {
  const app = createApp({
    game, position, movements,
  })
  console.log('app created, running...')
  app.run()
  const obj = {
    position: new PositionComponent(),
    movements: new MovementComponent(),
  }
  
  await app.store.dispatch(gameAddObject(obj))
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
  await app.store.dispatch(gameTickAction())
  console.log(app.store.getState())
  console.log(app.store.getState().position)
  console.log('done')
})()
