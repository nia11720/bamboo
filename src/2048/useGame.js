import { reactive, computed, toRefs } from 'vue'

const state = reactive({
  score: 0,
  is_success: false,
  is_game_over: false,
  is_stopped: false,
  squares: [],
})

const slots = computed(() =>
  state.squares.reduce((rv, square) => {
    if (!square.hidden) {
      const { x, y } = square
      rv[x + y * 4] = square
    }
    return rv
  }, Array(16).fill(null)),
)

const null_idxs = computed(() =>
  slots.value.reduce((rv, square, idx) => {
    if (square == null) {
      rv.push(idx)
    }
    return rv
  }, []),
)

let key = 1

const genRandomSquare = () => {
  const value = Math.random() < 0.7 ? 2 : 4
  const idx = null_idxs.value[Math.floor(Math.random() * null_idxs.value.length)]
  const x = idx % 4
  const y = idx >> 2

  state.squares.push({ x, y, key: key++, value })
}

const mergeSquare = (getRow, getPos) => {
  const new_squares = []
  let changed = false

  const place = (square, _x) => {
    const { x, y } = getPos(_x)
    if (x != null && square.x !== x) {
      changed = true
      square.x = x
    }
    if (y != null && square.y !== y) {
      changed = true
      square.y = y
    }
    new_squares.push(square)
  }

  for (let y = 0; y < 4; y++) {
    let x = 0
    let current = null

    for (const square of getRow(y)) {
      if (square == null) {
        continue
      } else if (current == null) {
        current = square
      } else if (current.value != square.value) {
        place(current, x++)
        current = square
      } else {
        current.hidden = true
        place(current, x)
        square.hidden = true
        place(square, x)

        const merged = { x: current.x, y: current.y, key: key++, value: current.value * 2 }
        place(merged, x++)

        current = null
        state.score += merged.value
        if (merged.value === 2048) {
          state.is_success = true
        }
      }
    }

    if (current != null) {
      place(current, x)
    }
  }

  state.squares = new_squares.sort((a, b) => a.x + a.y * 4 - (b.x + b.y * 4))
  return changed
}

const checkGameOver = () => {
  if (null_idxs.value.length !== 0) {
    return
  }

  for (let i = 0; i < 16; i++) {
    const current = slots.value[i]
    const right = (i + 1) % 4 ? slots.value[i + 1] : null
    const down = i + 4 < 16 ? slots.value[i + 4] : null

    if ((right && right.value === current.value) || (down && down.value === current.value)) {
      return
    }
  }

  state.is_game_over = true
}

function newGame() {
  state.score = 0
  state.is_game_over = false
  state.is_success = false
  state.is_stopped = false
  state.squares = []

  genRandomSquare()
  genRandomSquare()
}

function stopGame() {
  state.is_stopped = true
}

function continueGame() {
  state.is_stopped = false
}

function handleKeydown(e) {
  if (state.is_stopped || state.is_game_over) {
    return
  }

  const raw_slots = slots.value
  let getRow, getPos

  switch (e.key) {
    case 'ArrowLeft':
      getRow = (i) => raw_slots.slice(i * 4, i * 4 + 4)
      getPos = (x) => ({ x })
      break
    case 'ArrowRight':
      getRow = (i) => raw_slots.slice(i * 4, i * 4 + 4).reverse()
      getPos = (x) => ({ x: 3 - x })
      break
    case 'ArrowUp':
      getRow = (i) => [raw_slots[i], raw_slots[i + 4], raw_slots[i + 8], raw_slots[i + 12]]
      getPos = (y) => ({ y })
      break
    case 'ArrowDown':
      getRow = (i) => [raw_slots[i + 12], raw_slots[i + 8], raw_slots[i + 4], raw_slots[i]]
      getPos = (y) => ({ y: 3 - y })
      break
    default:
      break
  }

  if (mergeSquare(getRow, getPos)) {
    genRandomSquare()
    checkGameOver()
  }
}

export default function useGame() {
  return {
    ...toRefs(state),
    newGame,
    stopGame,
    continueGame,
    handleKeydown,
  }
}
