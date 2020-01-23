// /* eslint-disable no-console */
// import { createApp } from '../lib/createApp'
// import { game } from './systems/game'
// import { position } from './systems/position'
// import { gameAddObject, gameTickAction } from './systems/game/actions'
// import { movements, MovementComponent } from './systems/movements'
// import { PositionComponent } from '../lib/components'

// const memStats = () => ({
//   heapUsed: process.memoryUsage().heapUsed / 1024 / 1024,
//   rss: process.memoryUsage().rss / 1024 / 1024,
//   heapTotal: process.memoryUsage().heapTotal / 1024 / 1024,
// })

describe.skip('specs', () => {
  // describe('updates', () => {
  //   it('should increase all positions', async () => {
  //     const times = 1000
  //     const cObjects = 100
  //     const app = createApp({
  //       game, position, movements,
  //     })
  //     const { store } = app
  //     const obj = {
  //       position: new PositionComponent(),
  //       movements: new MovementComponent(),
  //     }
  //     await Promise.all(Array.from({ length: cObjects }).map(() =>
  //       app.store.dispatch(gameAddObject(obj))))
  //     const stats = memStats()
  //     const time = Date.now()
  //     await Promise.all(Array.from({ length: times }).map(() =>
  //       store.dispatch(gameTickAction())))
  //     console.log(`done in ${Date.now() - time}ms.`)
  //     const newStats = memStats()
  //     console.log({
  //       heapUsed: newStats.heapUsed - stats.heapUsed,
  //       heapTotal: newStats.heapTotal - stats.heapTotal,
  //       rss: newStats.rss - stats.rss,
  //     })
  //   })
  // })
})
