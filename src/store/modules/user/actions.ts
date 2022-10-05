import {Actions as BaseActions} from 'vuex-smart-module'
import Getters from './getters'
import Mutations from './mutations'
import State from './state'
import {Message, Sender} from 'src/store/modules/chats/types'
import {chatStore} from 'src/store'

export default class Actions extends BaseActions<State, Getters, Mutations, Actions> {
  setUsername(username: string): void {
    this.mutations.setUsername(username)

    this.state.websocket?.close()

    const websocket = new WebSocket(`wss://nane.tada.team/ws?username=${encodeURIComponent(username)}`)

    websocket.onmessage = function (event) {
      const payload = JSON.parse(event.data)

      if ('room' in payload) {
        const message = {
          room: payload.room,
          created: payload.created,
          sender: {
            username: payload.sender.username
          } as Sender,
          text: payload.text
        } as Message

        chatStore.actions.pushMessage(message)
      }
    }

    websocket.onerror = function () {
      alert('Websocket connection error. Please reload the page');
    }

    this.mutations.setWebsocket(websocket)
  }
}
