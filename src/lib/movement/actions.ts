import { createAction } from '@reduxjs/toolkit'
import { MovementComponent, MovementSystemState } from '.'

export const movementsAddAction = createAction<MovementComponent>('movement/add')
export const updateSystemAction = createAction<Partial<MovementSystemState>>('movement/updateSystem')

export const initialisedAction = createAction('movement/initialised')
