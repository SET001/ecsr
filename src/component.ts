export class Component {
  static componentID = 0
  name: string
  gameID: number = Component.componentID++
  componentID: number
  constructor() {
    this.name = this.constructor.name
  }
}
