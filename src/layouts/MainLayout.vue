<template>
  <div class="wa position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="wa__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">

          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="wa__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <span class="q-subtitle-1 q-pl-md">{{ chatStore.state.currentRoomName }}</span>

          <q-space/>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <span class="q-subtitle-1 q-pl-md">{{ userStore.state.username }}</span>
          <q-space/>

          <q-btn round dense flat icon="add" @click="createChat"/>

          <q-btn
            round
            flat
            icon="close"
            class="wa__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <RoomList :rooms="chatStore.getters.sortedRooms" v-model="currentRoom"/>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view/>
      </q-page-container>

      <q-footer v-if="currentRoom">
        <q-toolbar class="bg-grey-3 text-black row" style="padding: 10px">
          <q-input
            rounded
            outlined
            dense
            class="wa__field col-grow q-mr-sm"
            bg-color="white"
            placeholder="Type a message"
            v-model="message"
            counter
            :maxlength="settingsStore.state.settings.max_message_length"
            v-on:keyup.enter="sendMessage"
          />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import {useQuasar, Loading} from 'quasar'
import {computed, onMounted, ref} from 'vue'
import {userStore, settingsStore, chatStore} from 'src/store'
import RoomList from 'src/components/RoomList.vue'
import {Room} from 'src/store/modules/chats/types'

const $q = useQuasar()
const style = computed(() => ({
  height: $q.screen.height + 'px'
}))
const leftDrawerOpen = ref(false)
const currentRoom = computed({
  get: () => chatStore.getters.currentRoom,
  set(room) {
    chatStore.actions.setCurrentRoom((room as Room).name)
  }
})
const message = ref<string>('')

Loading.show();

function toggleLeftDrawer(): void {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function sendMessage(): void {
  if (message.value.length === 0) return

  chatStore.actions.sendMessageToCurrentRoom(message.value)

  message.value = ''
}

function createChat() {
  const settings = settingsStore.state.settings
  if (!settings) throw Error('Settings not loaded')

  $q.dialog({
    title: 'Create chat',
    message: 'Write the name of the chat. The following characters are not allowed: /',
    prompt: {
      model: '',
      isValid: val => val.length > 1
        && val.length <= settings.max_room_title_length
        && val.indexOf('/') === -1,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(async (roomName) => {
    if (chatStore.getters.roomByName(roomName) === null) {
      await chatStore.actions.sendMessageToRoom({
        roomName: roomName,
        text: 'I created this chat'
      })
    }
    await chatStore.actions.setCurrentRoom(roomName)
  })
}

onMounted(async () => {
  await settingsStore.actions.load()
  await chatStore.actions.load()

  Loading.hide()

  if (userStore.state.username === null) {
    const settings = settingsStore.state.settings
    if (!settings) throw Error('Settings not loaded')

    $q.dialog({
      title: 'Enter your name',
      prompt: {
        model: '',
        isValid: val => val.length > 1 && val.length <= settings.max_username_length,
        type: 'text'
      },
      cancel: false,
      persistent: true
    }).onOk(data => userStore.actions.setUsername(data))
  }
})
</script>

<style lang="sass" scoped>
.wa
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .wa__drawer-close
      display: none

@media (max-width: 850px)
  .wa
    padding: 0

    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .wa
    &__drawer-open
      display: none
</style>
