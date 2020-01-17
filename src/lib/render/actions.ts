import { RootState } from 'src/example'
import { Dispatch, createAction } from '@reduxjs/toolkit'

import { PixiRenderSystemState, RenderComponent } from '.'

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

export const init = (
  // layers: any
) => (dispatch: Dispatch, getState: ()=>RootState) => {
  const { container, app } = getState().render
  container.appendChild(app.view)
  // window.addEventListener('resize', () => dispatch(resize))
}

export const run = (dispatch: Dispatch, getState: ()=>RootState) => {
  const { app, stage } = getState().render
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
