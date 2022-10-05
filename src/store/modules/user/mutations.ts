import State from './state'
import {Mutations as BaseMutations} from 'vuex-smart-module'

export default class Mutations extends BaseMutations<State> {
  setUsername(username: string | null): void {
    this.state.username = username
  }

  setWebsocket(websocket: WebSocket): void {
    this.state.websocket = websocket
  }
}
