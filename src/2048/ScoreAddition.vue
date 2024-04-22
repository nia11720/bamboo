<script setup>
import { ref, watch } from 'vue'

import useGame from './useGame'

const { score } = useGame()

const text = ref('')
watch(score, (new_score, old_score) => {
  text.value = new_score ? `+${new_score - old_score}` : ''
})
</script>

<template>
  <TransitionGroup tag="div" class="relative">
    <div
      class="absolute left-1/2 -translate-x-1/2 -top-16 opacity-0 font-bold text-2xl text-slate-900"
      :key="score"
    >
      {{ text }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.v-enter-active {
  @apply transition-all duration-700 ease-in;
}
.v-enter-from {
  @apply top-0 opacity-100;
}
</style>
