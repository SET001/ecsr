// import { clone } from 'ramda'
// import { createSelector } from 'reselect'
// import { assert } from 'chai'
// import * as PIXI from 'pixi.js' //   remove any render-specific stuff from here
// import { Store } from './store'
// import { RootState } from './reducer'
// import { gameTickAction } from './actions'
// import { RenderComponent } from './systems/render'

// const times = 1
// const cObjects = 3
// const timeout = 60000

// let state = null
// class Bug {}

// const selectPositions = (state: RootState) => state.position
// const selectViews = (state: RootState) =>
//  state.render.components.filter((view) => view.viewClass === Bug)

// const selectRelatedPositions = createSelector(
//   [selectPositions, selectViews],
//   (positions, views) => positions.filter(
//     (position) => views.find(
//       (render: RenderComponent) => position.objectID === render.objectID,
//     ),
//   ),
// )
// const newObj = () => {
//   const obj: any = {
//     position: {
//       x: Math.ceil(Math.random() * 1000),
//       y: Math.ceil(Math.random() * 1000),
//     },
//   }
//   // if (Math.random()>0.5){
//   obj.move = {
//     x: Math.random(),
//     y: Math.random(),
//   }
//   // }
//   return obj
// }
// const bugs = {
//   objects: [],
//   props: (state) => ({
//     position: selectRelatedPositions(state),
//   }),
//   updates: {
//     position: (positions) => {
//       positions.map((position) => {
//         const object = bugs.objects.find((obj) => obj.goID === position.goID)
//         object.position.set(position.x, position.y)
//       })
//     },
//   },
// }

// const memStats = () => ({
//   heapUsed: process.memoryUsage().heapUsed / 1024 / 1024,
//   rss: process.memoryUsage().rss / 1024 / 1024,
//   heapTotal: process.memoryUsage().heapTotal / 1024 / 1024,
// })

// const test = (store, ds) => {
//   const foo = async (dispatch) => {
//     const stats = memStats()
//     const time = Date.now()
//     await Promise.all(Array.from({ length: times }).map(() => {
//       store.dispatch(gameTickAction())
//     }))

//     const { position } = store.getState() as any
//     console.log(`done in ${Date.now() - time}ms.`)
//     const newStats = memStats()
//     console.log({
//       heapUsed: newStats.heapUsed - stats.heapUsed,
//       heapTotal: newStats.heapTotal - stats.heapTotal,
//       rss: newStats.rss - stats.rss,
//     })

//     Array.from({ length: cObjects - 1 }).map((o, i) => {
//       assert.equal(position[i].x, ds.position[i].x + times)
//     })
//   }
//   store.dispatch(foo)
// }

// beforeEach(() => {
//   let goID = 0
//   let cID = 0
//   state = {}
//   for (let i = 0; i < cObjects; i++) {
//     const obj = newObj()
//     obj.goID = goID++
//     obj.position.id = cID++
//     obj.position.goID = obj.goID
//     obj.move.id = cID++
//     obj.move.goID = obj.goID
//     // state.game.objects.push(obj.goID)
//     state.move.push(obj.move)
//     state.position.push(obj.position)
//     if (Math.random() > 0.7) {
//       state.render.push({
//         goID: obj.goID,
//         id: cID++,
//         viewClass: Bug,
//       })
//       const view = new PIXI.Container();
//       (view as any).goID = obj.goID
//       bugs.objects.push(view)
//     }
//   }
//   console.log({ state })
//   // console.log({state})
// })

// describe('specs', () => {
//   describe('updates', () => {
//     it('should increase all positions', async () => {
//       const store = Store({})
//       const cache = {
//         bugs: bugs.props(store.getState()),
//       }
//       store.subscribe(() => {
//         const state = store.getState()
//         const props = bugs.props(store.getState())
//         Object.entries(props).map(([key, velue]) => {
//           // console.log({key, velue})
//           bugs.updates[key](props[key])
//         })
//         // cache.bugs = props
//       })
//       await test(store, state)
//       // console.log(bugs.objects[0].position, state.position[0])
//     }).timeout(timeout)
//   })
// })
