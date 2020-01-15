import { createReducer } from 'redux-create-reducer'
import { increment } from '../../../lib'
import {
  gameTickAction, gameAddComponentAction, gameAddObjectAction,
} from './actions'

import { GameState } from '.'

export const defaultState: GameState = {
  tick: 0,
  gameID: 0,
  componentID: 0,
  objects: [],
  // systems: []
}
export const reducer = createReducer(defaultState, {
  [gameTickAction.type]: increment<GameState>('tick'),
  [gameAddObjectAction.type]: increment<GameState>('gameID'),
  [gameAddComponentAction.type]: increment<GameState>('componentID'),
})
