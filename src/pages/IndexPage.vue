<template>
  <q-page class="row items-center justify-evenly" padding>
    <div style="width: 100%">
      <div>
        <ChatMessage
          v-for="(message, i) in chatStore.getters.currentRoomMessages"
          :key="i"
          :message="message"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {chatStore} from 'src/store'
import ChatMessage from 'components/ChatMessage.vue'
</script>
