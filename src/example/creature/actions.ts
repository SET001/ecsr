import { PositionComponent } from '../../lib/position/component'

import { gameAddObject } from '../../lib/game/actions'
import { MovementComponent, RenderComponent } from '../../lib'

// TODO: deal with dispatch
export const createCreature = (layer) => (dispatch: any) => {
  const object = {
    position: new PositionComponent(),
    // health: new HealthComponent(),
    movement: new MovementComponent(),
    render: new RenderComponent(),
  }
  object.render.layer = layer

  dispatch(gameAddObject(object))
}
