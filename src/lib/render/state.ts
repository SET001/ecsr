import * as PIXI from 'pixi.js'
import { PixiRenderSystemState } from '.'

export const state: PixiRenderSystemState = {
  app: new PIXI.Application(),
  components: [],
  container: null,
  stage: new PIXI.Container(),
  layers: [],
}
