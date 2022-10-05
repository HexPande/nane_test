import client from './axios'

// TODO: Тут необходимо добавить типы и далее использовать маппинг

const getSettings = () =>
  client
    .get('settings')
    .then(response => response.data.result)

const getRooms = () =>
  client
    .get('rooms')
    .then(response => response.data.result)

const getRoomHistory = (room: string) =>
  client
    .get(`rooms/${encodeURIComponent(room)}/history`)
    .then(response => response.data.result)

export default {
  getRooms,
  getSettings,
  getRoomHistory
}
