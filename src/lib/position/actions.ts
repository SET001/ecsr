import { createAction } from '@reduxjs/toolkit'
import { PositionComponent } from '../components'

export const positionBulkUpdateAction = createAction<PositionComponent[]>('position/bulkUpdate')
export const positionUpdateAction = createAction<PositionComponent>('position/update')
export const positionAddAction = createAction<PositionComponent>('position/add')
export const positionRemoveAction = createAction<PositionComponent>('position/remove')
export const initialisedAction = createAction('position/initialised')

export const init = () => async () => new Promise((resolve) =>
  setTimeout(resolve, 3000))
