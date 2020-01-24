import * as PIXI from 'pixi.js'
import { RenderEngine } from '.'

(window as any).PIXI = PIXI

export class PixiRender implements RenderEngine {
  stage = new PIXI.Container()
  app = new PIXI.Application()

  init(container: HTMLElement) {
    container.appendChild(this.app.view)
  }

  render() {
    this.app.renderer.render(this.stage)
    this.app.renderer.gl.flush()
  }

  addMesh(mesh:PIXI.Sprite) {
    this.stage.addChild(mesh)
  }

  removeMesh(mesh: PIXI.Sprite) {
    this.stage.removeChild(mesh)
  }
}
