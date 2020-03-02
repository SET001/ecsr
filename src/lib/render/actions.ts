// import { AppDispatch } from 'src/example'
import { createAction, Dispatch } from '@reduxjs/toolkit'
import {
  RenderSystemState, RenderComponent, RenderSystemDependencies,
} from './index'
import { Action } from '..'
import { GameAddComponentAction } from '../game/actions'
import { PixiRender } from './pixiRender'


export const updateSystemAction = createAction<Partial<RenderSystemState>>('render/updateSystem')
export const addComponentAction = createAction<RenderComponent>('render/add')
export const addRemoveAction = createAction<RenderComponent>('render/remove')
export const initialisedAction = createAction('render/initialised')
// export const addComponent = (component: RenderComponent) =>
//   (dispatch: Dispatch, getState: ()=>RootState) => {

//   }

// //  TODO the param should be component or component ID?
// export const removeComponent = (component: RenderComponent) =>
//   (dispatch: Dispatch, getState: ()=>RootState) => {

//   }

export const init = () => async (dispatch: Dispatch, getState: ()=>RenderSystemDependencies) => {
  await dispatch(updateSystemAction({
    engine: new PixiRender(),
  }))
  const { container, engine } = getState().render
  engine.init(container)
  engine.render()
  // const renderLoop = () => {
  //   engine.render()
  //   requestAnimationFrame(renderLoop)
  // }
  // renderLoop()
}

export const addObject = (action: Action<GameAddComponentAction<RenderComponent>>) => (
  dispatch: Dispatch,
  getState: ()=>RenderSystemDependencies,
) => {
  console.log('render sytem: adding object', action)
  const { engine } = getState().render
  engine.addMesh(action.payload.component.mesh)
}

export const render = () => (
  dispatch: Dispatch,
  getState: ()=>RenderSystemDependencies,
) => {
  const { engine } = getState().render
  engine.render()
}


/**
 * TODO
 * -  stop action to stop render loop?
 * -  resize action?
 *
 *  */
