import { assert } from 'chai'
import {
  init, isDepsSatisfied,
} from './createApp'
import { System } from './system'

const createTestSystem = (config = {}): System => ({
  epic: null,
  state: {},
  actions: {
    init: async () => new Promise(
      (resolve) => setTimeout(resolve, Math.round(Math.random() * 10) * 100),
    ),
  },
  reducer: null,
  deps: [],
  ...config,
})

const systemA: System = createTestSystem()
const systemB: System = createTestSystem()
const nonExistentSystem: System = createTestSystem()

const systemC: System = createTestSystem({ deps: [systemA, systemB] })
const systemD: System = createTestSystem({
  deps: [systemA],
})
const systemDependOnB: System = createTestSystem({
  deps: [systemB],
})
const lastSystem: System = createTestSystem({
  deps: [systemC],
})
const unmetDepsSystem:System = createTestSystem({
  deps: [nonExistentSystem],
})

describe('App', () => {
  describe('isDepsSatisfied', () => {
    it('should return true if system does not have any dependencies', () => {
      assert.isTrue(isDepsSatisfied({})(systemB))
    })

    it('should return true if all dependencies satisfied', () => {
      const initialised = {
        systemA,
      }
      assert.isTrue(isDepsSatisfied(initialised)(systemD))
    })

    it('should return false if single dependency is not satisfied', () => {
      const initialised = {
        systemA,
      }
      assert.isFalse(isDepsSatisfied(initialised)(systemDependOnB))
    })
  })

  describe('init', () => {
    //  TODO: decompose this test
    it('sss', async () => {
      const dispatch = (action: any) => action
      const { ready, pending } = await init(dispatch)({
        systemA,
        systemC,
        systemD,
        lastSystem,
        systemDependOnB,
        systemB,
        unmetDepsSystem,
      })
      assert.isDefined(pending.unmetDepsSystem)
      assert.isDefined(ready.systemA)
      assert.isDefined(ready.systemC)
      assert.isDefined(ready.systemD)
      assert.isDefined(ready.systemB)
    }).timeout(60000)
  })
})
