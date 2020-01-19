import { createAction } from '@reduxjs/toolkit'
import { MovementComponent } from '.'

export const movementsAddAction = createAction<MovementComponent>('movements/add')
