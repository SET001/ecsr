import { Component } from '../../../lib'

export interface RenderComponent extends Component{
  viewClass: any
}

export interface RenderSystemState{
  components: RenderComponent[]
}

export * from './reducer'
