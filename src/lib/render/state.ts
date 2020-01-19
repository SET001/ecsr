import * as PIXI from 'pixi.js'
import { PixiRenderSystemState } from '.'

export const state: PixiRenderSystemState = {
  app: null,
  components: [],
  container: null,
  stage: new PIXI.Container(),
  layers: [],
}
