import { assert } from 'chai'
import {
  init, isDepsSatisfied,
  // initParse,
  // initParseSysNames
} from './createApp'
import { System } from './system'

const createTestSystem = (config = {}): System => ({
  epic: null,
  state: {},
  actions: {
    init: async () => new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 10) * 1000)),
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

describe.only('App', () => {
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
    it('sss', async () => {
      const dispatch = (action: any) => action
      const parsed = await init(dispatch)({
        systemA,
        systemC,
        systemD,
        lastSystem,
        systemDependOnB,
        systemB,
        unmetDepsSystem,
      })
    //   console.log({ parsed })
    //   // console.log({ parsed: initParseSysNames(parsed) })
    }).timeout(60000)
  })
})
