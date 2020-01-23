import { clone } from 'ramda'
import { game } from '../../lib/game'
import { render, movement } from '../../lib'

export const base = {
  game: clone(game.state),
  render: clone(render.state),
  movement: clone(movement.state),
}

base.render.container = document.getElementById('viewport')
