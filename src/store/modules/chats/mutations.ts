import State from './state'
import {Mutations as BaseMutations} from 'vuex-smart-module'
import {Room, Message} from './types';

export default class Mutations extends BaseMutations<State> {
  setRooms(rooms: Room[]): void {
    this.state.rooms = rooms
  }

  setCurrentRoomName(name: string): void {
    if (this.state.currentRoomName === name) return

    this.state.currentRoomName = name
  }

  pushMessage(message: Message): void {
    if (!this.state.history[message.room]) {
      this.state.history[message.room] = [message]
    } else {
      this.state.history[message.room].push(message)
    }
  }
}
