import { clone } from 'ramda'
import { base } from './base'
import { RootState } from '../index'

export const dev: Partial<RootState> = clone(base)
dev.game.tick = 100
