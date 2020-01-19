import { clone } from 'ramda'
import { game } from '../../lib/game'
import { render } from '../../lib'

export const base = {
  game: clone(game.state),
  render: clone(render.state),
}

base.render.container = document.getElementById('viewport')
