import { createReducer } from 'redux-create-reducer'
import { increment } from '..'
import {
  gameTickAction, gameAddComponentAction, gameAddObjectAction,
} from './actions'

import { state } from './state'
import { GameState } from '.'

export const reducer = createReducer(state, {
  [gameTickAction.type]: increment<GameState>('tick'),
  [gameAddObjectAction.type]: increment<GameState>('gameID'),
  [gameAddComponentAction.type]: increment<GameState>('componentID'),
})
