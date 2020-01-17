import { PositionComponent } from 'src/lib/components'

import { gameAddObject } from '../../lib/game/actions'
import { MovementComponent, RenderComponent } from '../../lib'
import { AppDispatch } from '..'

export const createCreature = (layer) => (dispatch: AppDispatch) => {
  const object = {
    position: new PositionComponent(),
    // health: new HealthComponent(),
    movements: new MovementComponent(),
    render: new RenderComponent(),
  }
  object.render.layer = layer

  dispatch(gameAddObject(object))
}
