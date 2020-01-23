import { createAction } from '@reduxjs/toolkit'
import { MovementComponent, MovementSystemState } from '.'

export const movementsAddAction = createAction<MovementComponent>('movement/add')
export const updateSystemAction = createAction<Partial<MovementSystemState>>('movement/updateSystem')

export const initialisedAction = createAction('movement/initialised')

export const init = () => async () => new Promise((resolve) =>
  setTimeout(resolve, 1000))
