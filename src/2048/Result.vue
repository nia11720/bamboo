<script setup>
import { ref, watchEffect } from 'vue'

import useGame from './useGame'

const { is_game_over, is_success, stopGame, continueGame } = useGame()

const show = ref(false)
watchEffect(() => {
  if (is_game_over.value || is_success.value) {
    stopGame()
    show.value = true
  } else {
    show.value = false
  }
})

const close = () => {
  continueGame()
  show.value = false
}
</script>

<template>
  <Transition>
    <div v-if="show" class="bg-slate-500 bg-opacity-50" @click="close">
      <div class="w-fit mx-auto mt-48 font-bold text-6xl text-sky-900">
        {{ is_game_over ? 'Game Over!' : is_success ? 'You Win!' : '' }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active {
  @apply transition-all delay-500 duration-1000 ease-in;
}
.v-enter-from {
  @apply opacity-0;
}
</style>
