import {Room, History} from './types'

export default class Store {
  currentRoomName: string | null = null
  rooms: Room[] = []
  history: History = {}
}
