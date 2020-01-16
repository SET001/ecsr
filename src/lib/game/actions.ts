import { createAction, Dispatch } from '@reduxjs/toolkit'
import { Component } from '..'
import { RootState } from '../../example/index'

//  TODO; what is the game object in terms of engine?
export type GameObject = {[key: string]:Component}

export interface GameAddComponentAction<T extends Component = any>{
  gameID: number,
  componentID: number,
  component: T
}
export const gameTickAction = createAction<void>('game/tick')
export const gameNoopAction = createAction('game/noop')
export const gameAddObjectAction = createAction<GameObject>('game/addObject')
export const gameAddComponentAction = createAction<GameAddComponentAction>('game/addComponent')
export const gameRemoveComponentAction = createAction<Component>('game/removeComponent')

export const gameAddObject = (object:GameObject) =>
  async (dispatch: Dispatch, getState: ()=>RootState) => {
    await dispatch(gameAddObjectAction())
    const { gameID } = getState().game
    await Promise.all(Object.entries(object).map(async ([, component]) => {
      const { componentID } = getState().game
      return dispatch(gameAddComponentAction({
        component, gameID, componentID,
      }))
    }))
  }
