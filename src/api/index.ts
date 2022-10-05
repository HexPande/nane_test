import client from './axios'

const getSettings = () =>
  client
    .get('settings')
    .then(response => response.data.result)

const getRooms = () =>
  client
    .get('rooms')
    .then(response => response.data.result)

const getRoomHistory = (roomName: string) =>
  client
    .get(`rooms/${roomName}/history`)
    .then(response => response.data.result)

export default {
  getRooms,
  getSettings,
  getRoomHistory
}
