import {Actions as BaseActions} from 'vuex-smart-module'
import Getters from './getters'
import Mutations from './mutations'
import State from './state'
import {Message, Room} from './types'
import api from 'src/api'
import {userStore} from 'src/store';

export default class Actions extends BaseActions<State, Getters, Mutations, Actions> {
  async load(): Promise<void> {
    let rooms = await api.getRooms() as Room[]

    rooms = rooms.filter((room) => {
      return room.name.indexOf('/') === -1
    })

    this.mutations.setRooms(rooms)

    for (const room of rooms) {
      const messages = await api.getRoomHistory(room.name) as Message[]
      this.mutations.pushMessages({
        room: room.name,
        messages: messages
      })
    }
  }

  setCurrentRoom(name: string): void {
    if (name === this.state.currentRoomName) return

    this.mutations.setCurrentRoomName(name)
  }

  sendMessageToRoom(payload: { roomName: string, text: string }): void {
    const websocket = userStore.state.websocket
    if (websocket === null) throw Error('Socket not defined')

    websocket.send(JSON.stringify({
      room: payload.roomName,
      text: payload.text
    }))
  }

  sendMessageToCurrentRoom(text: string): void {
    const roomName = this.state.currentRoomName
    if (roomName === null) throw Error('Current room not defined')

    const websocket = userStore.state.websocket
    if (websocket === null) throw Error('Socket not defined')

    websocket.send(JSON.stringify({
      room: roomName,
      text: text
    }))
  }

  async pushMessage(message: Message): Promise<void> {
    if (!this.getters.roomByName(message.room)) {
      await this.dispatch('load')
    }

    this.mutations.pushMessage(message)
  }
}
