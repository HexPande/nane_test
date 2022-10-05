<template>
  <q-list>
    <q-item
      v-for="room in rooms"
      :key="room.name"
      clickable
      v-ripple
      @click="$emit('update:modelValue', room)"
      :active="room.name === modelValue?.name"
      :class="{'q-manual-focusable--focused': room.name === modelValue?.name}"
    >
      <q-item-section>
        <q-item-label lines="1">
          {{ formatText(room.name, 30) }}
        </q-item-label>
        <q-item-label caption>
          {{ formatText(getLastMessageDescription(room), 30) }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label caption>
          {{ formatDate(room.last_message.created) }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import {Room} from 'src/store/modules/chats/types'
import moment from 'moment'
import {chatStore} from 'src/store'

defineProps<{
  rooms: Room[],
  modelValue: Room | null
}>()

defineEmits<{
  (e: 'update:modelValue', payload: Room): void
}>()

function formatDate(date?: string): string {
  if (date === undefined) return ''
  return moment(date).format('HH:mm')
}

function formatText(text: string, length: number): string {
  if (text.length < length) return text
  return text.slice(0, length - 3) + '...'
}

function getLastMessageDescription(room: Room): string {
  const message = chatStore.getters.lastMessageByRoomName(room.name)
  if (!message) return ''

  return message.sender.username + ': ' + message.text
}
</script>
