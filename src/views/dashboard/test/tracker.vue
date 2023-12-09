<template>
  <div>
    {{ isConnect ? 'connected' : 'not connected' }}
    {{ msgs }}
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { SIO } from './sio'
import { useUserStore } from '/@/store/modules/user';

const msgs = ref<any[]>([])
const isConnect = ref(false)
const messenger = new SIO()
const userStore = useUserStore()
onMounted(async () => {
  messenger.on('connected', () => {
    isConnect.value = true
  })

  messenger.on('message', (msg) => {
    msgs.value.push(msg)
  })

  messenger.on('geo-update', (msg) => {
    msgs.value.push(msg)
  })

  await messenger.connect(userStore.getToken)
})

</script>

<style scoped></style>
