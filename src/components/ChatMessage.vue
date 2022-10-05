<template>
  <q-chat-message
    :name="message.sender.username"
    :text="[message.text]"
    :sent="message.sender.username === userStore.state.username"
    :stamp="stamp"
  />
</template>

<script setup lang="ts">
import {userStore} from 'src/store'
import moment from 'moment/moment'
import {computed} from 'vue';
import {Message} from 'src/store/modules/chats/types'

const props = defineProps<{
  message: Message,
}>()

const stamp = computed(() => {
  return moment(props.message.created).fromNow()
});
</script>
