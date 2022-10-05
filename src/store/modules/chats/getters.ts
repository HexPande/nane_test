import State from './state'
import {Getters as BaseGetters} from 'vuex-smart-module'
import {Room, Message} from './types'
//import moment from 'moment/moment'

export default class Getters extends BaseGetters<State> {
  get sortedRooms(): Room[] {
    const rooms = this.state.rooms

    // rooms.sort((a, b) => {
    //   const c = this.lastMessageByRoomName(a.name)?.created;
    //   const d = this.lastMessageByRoomName(b.name)?.created;
    //   if (!c || !d) return 0
    //
    //   return moment(d).unix() - moment(c).unix()
    // })

    return rooms
  }

  get currentRoom(): Room | null {
    const name = this.state.currentRoomName
    if (name === null) return null

    const room = this.state.rooms?.find(r => r.name === name);
    if (!room) return null

    return room
  }

  get currentRoomMessages(): Message[] {
    const roomName = this.state.currentRoomName
    if (roomName === null) return []

    return this.state.history[roomName] ?? []
  }

  roomByName(name: string): Room | null {
    const room = this.state.rooms?.find(r => r.name === name);
    if (!room) return null

    return room
  }

  lastMessageByRoomName(name: string): Message | null {
    if (this.state.history[name]) {
      const message = this.state.history[name].slice(-1).pop();
      if (message) return message
    }

    const room = this.state.rooms?.find(r => r.name === name);
    if (!room) return null

    return room.last_message
  }
}
