// import { AppDispatch } from 'src/example'
import { createAction, Dispatch } from '@reduxjs/toolkit'
import * as PIXI from 'pixi.js'
import {
  PixiRenderSystemState, RenderComponent, RenderSystemDependencies,
} from './index'


export const updateSystemAction = createAction<Partial<PixiRenderSystemState>>('render/updateSystem')
export const addComponentAction = createAction<RenderComponent>('render/add')
export const addRemoveAction = createAction<RenderComponent>('render/remove')

// export const addComponent = (component: RenderComponent) =>
//   (dispatch: Dispatch, getState: ()=>RootState) => {

//   }

// //  TODO the param should be component or component ID?
// export const removeComponent = (component: RenderComponent) =>
//   (dispatch: Dispatch, getState: ()=>RootState) => {

//   }

export const init = async (dispatch: Dispatch, getState: ()=>RenderSystemDependencies) => {
  const app = new PIXI.Application()
  await dispatch(updateSystemAction({
    app,
  }))

  const { container } = getState().render
  container.appendChild(app.view)
  // window.addEventListener('resize', () => dispatch(resize))
}

export const run = (dispatch: Dispatch, getState: ()=>RenderSystemDependencies) => {
  const { app, stage } = getState().render
  console.log({ app }, { ...app }, app.view)
  app.renderer.render(stage)
  app.renderer.gl.flush()

  const renderLoop = () => {
    requestAnimationFrame(renderLoop)
  }
  renderLoop()
}


/**
 * TODO
 * -  stop action to stop render loop?
 * -  resize action?
 *
 *  */
