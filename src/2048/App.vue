<script setup lang="jsx">
import { ref, watch } from 'vue'

import ScoreAddition from './ScoreAddition.vue'
import Squares from './Squares.vue'
import Result from './Result.vue'
import useGame from './useGame'

const { score, newGame, handleKeydown } = useGame()
window.addEventListener('keydown', handleKeydown)
newGame()

const best_score = ref(parseInt(localStorage.getItem('best_score')) || 0)
watch(score, (new_score) => {
  if (new_score > best_score.value) {
    best_score.value = new_score
    localStorage.setItem('best_score', new_score)
  }
})
</script>

<script lang="jsx">
const Score = (props, { slots }) => {
  return (
    <div class="flex flex-col items-center w-fit min-w-16 px-2 pt-1 rounded-md font-bold text-slate-50 bg-slate-500">
      <div class="text-xs">{props.title}</div>
      <div class="text-2xl">{slots.default()}</div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button class="w-fit px-5 py-2 rounded-md font-bold text-lg text-slate-50 bg-slate-700">
      {props.title}
    </button>
  )
}

const GridBackground = () => {
  const Cell = <div class="float-left size-1/5 ml-[4%] mt-[4%] rounded bg-slate-500"></div>
  return <div>{Array(16).fill(Cell)}</div>
}
</script>

<template>
  <div class="w-[480px] mx-auto mt-4">
    <Score title="BEST" class="float-right ml-2">{{ best_score }}</Score>
    <Score title="SCORE" class="float-right"> {{ score }}<ScoreAddition class="-top-8" /> </Score>
    <Button title="New Game" class="float-right clear-right mt-2" @click="newGame" />

    <div class="text-sky-700">
      <div class="font-bold text-4xl"><a href="https://2048game.com/" target="_blank">2048</a></div>
      <div class="mt-4 font-bold">Play 2048 Game Online</div>
      <div>Join the numbers and get to the <span class="font-bold">2048 tile!</span></div>
    </div>

    <div class="relative aspect-square *:size-full mt-4 rounded-lg bg-slate-400">
      <GridBackground class="absolute" />
      <Squares />
      <Result class="absolute top-0" />
    </div>
  </div>
</template>
