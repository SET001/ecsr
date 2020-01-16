import {gameAddObject} from '../game/actions'
import { PositionComponent } from 'src/lib/components'
import { MovementComponent } from '../movements'
import { Dispatch } from '@reduxjs/toolkit'
import { RenderComponent } from '..'

export const createCreature = (dispatch: Dispatch<any>)=>{
  const object = {
    position: new PositionComponent(),
    // health: new HealthComponent(),
    movements: new MovementComponent(),
    render: new RenderComponent()
  }

  dispatch(gameAddObject(object))
}