import { Action } from './index'
import { GameAddComponentAction } from './game/actions'
import { PositionComponent } from './components'
import { SystemSubscription } from './system'

export const filterComponentName = (componentName: String) =>
  (action: Action<GameAddComponentAction<PositionComponent>>) =>
    action.payload.component.name === componentName

export const matchComponent = (
  componentName: string,
  mapper: (action: Action) => any,
): SystemSubscription => ({
  filter: filterComponentName(componentName),
  map: mapper,
})
