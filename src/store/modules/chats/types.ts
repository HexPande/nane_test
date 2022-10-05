export interface Sender {
  username: string
}

export interface Message {
  id?: string
  room: string
  created?: string
  sender: Sender
  text: string
}

export interface Room {
  name: string
  last_message: Message
}

export interface History {
  [key: string]: Message[]
}
