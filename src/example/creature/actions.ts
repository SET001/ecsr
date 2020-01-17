import { PositionComponent } from 'src/lib/components'
import { Dispatch } from '@reduxjs/toolkit'
import { gameAddObject } from '../../lib/game/actions'
import { MovementComponent, RenderComponent } from '../../lib'

export const createCreature = (layer) => (dispatch: Dispatch<any>) => {
  const object = {
    position: new PositionComponent(),
    // health: new HealthComponent(),
    movements: new MovementComponent(),
    render: new RenderComponent(),
  }
  object.render.layer = layer

  dispatch(gameAddObject(object))
}
