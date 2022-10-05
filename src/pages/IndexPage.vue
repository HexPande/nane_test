<template>
  <q-page class="row items-center justify-evenly" padding>
    <div style="width: 100%">
      <div>
        <q-chat-message
          v-for="(message, i) in chatStore.getters.currentRoomMessages"
          :key="i"
          :name="message.sender.username"
          :text="[message.text]"
          :sent="message.sender.username === userStore.state.username"
          :stamp="formatDate(message.created)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {chatStore, userStore} from 'src/store'
import moment from 'moment/moment'

function formatDate(date?: string): string {
  if (date === undefined) return ''
  return moment(date).fromNow()
}
</script>
