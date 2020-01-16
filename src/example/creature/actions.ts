import {gameAddObject} from '../../lib/game/actions'
import { PositionComponent } from 'src/lib/components'
import { MovementComponent } from '../../lib/movements'
import { Dispatch } from '@reduxjs/toolkit'
import { RenderComponent } from '../systems'

export const createCreature = (layer) => (dispatch: Dispatch<any>)=>{
  const object = {
    position: new PositionComponent(),
    // health: new HealthComponent(),
    movements: new MovementComponent(),
    render: new RenderComponent()
  }
  object.render.layer = layer

  dispatch(gameAddObject(object))
}