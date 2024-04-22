<script setup lang="jsx">
import useGame from './useGame'

const { squares } = useGame()
</script>

<script lang="jsx">
const color_classes = {
  2: 'text-6xl text-zinc-300 bg-zinc-500',
  4: 'text-6xl text-neutral-300 bg-neutral-500',
  8: 'text-6xl text-orange-100 bg-orange-300',
  16: 'text-6xl text-orange-100 bg-orange-400',
  32: 'text-6xl text-orange-50 bg-orange-500',
  64: 'text-6xl text-orange-50 bg-orange-600',
  128: 'text-5xl text-yellow-50 bg-yellow-400',
  256: 'text-5xl text-yellow-50 bg-yellow-500',
  512: 'text-5xl text-yellow-50 bg-yellow-600',
  1024: 'text-4xl text-indigo-50 bg-indigo-500',
  2048: 'text-4xl text-indigo-50 bg-indigo-600',
}

const Square = ({ value, x, y }) => {
  const color_class = value <= 2048 ? color_classes[value] : color_classes[2048]
  const left = `${x * 24 + 4}%`
  const top = `${y * 24 + 4}%`

  return (
    <div
      class={`absolute size-1/5 rounded flex justify-center items-center font-bold ${color_class}`}
      style={{ top, left }}
    >
      {value}
    </div>
  )
}
</script>

<template>
  <TransitionGroup tag="div" class="relative">
    <Square v-for="square in squares" :key="square.key" v-bind="square" />
  </TransitionGroup>
</template>

<style scoped>
.v-enter-active {
  animation-name: appear;
  animation-delay: 100ms;
  animation-duration: 200ms;
  animation-fill-mode: backwards;
}
@keyframes appear {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.v-move {
  @apply transition-all duration-100;
}
</style>
