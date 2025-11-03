<script setup lang="ts">
const props = withDefaults(defineProps<{
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseMs?: number
  loop?: boolean
}>(), { typeSpeed: 80, deleteSpeed: 40, pauseMs: 1200, loop: true })

const displayedText = ref('')
const activeWordIndex = ref(0)
const activeCharIndex = ref(0)
const isDeleting = ref(false)
let intervalId: number | undefined
let timeoutId: number | undefined

const startTyping = () => {
  clearTimers()
  intervalId = window.setInterval(tick, props.typeSpeed)
}

const startDeleting = () => {
  clearTimers()
  intervalId = window.setInterval(tick, props.deleteSpeed)
}

const clearTimers = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = undefined
  }
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = undefined
  }
}

const tick = () => {
  const words = props.words?.length ? props.words : []
  if (!words.length) return

  const currentWord: string|undefined = words[activeWordIndex.value]
  if (!currentWord) return
  if (!isDeleting.value) {
    activeCharIndex.value = Math.min(activeCharIndex.value + 1, currentWord.length)
    displayedText.value = currentWord.slice(0, activeCharIndex.value)
    if (activeCharIndex.value >= currentWord.length) {
      isDeleting.value = true
      clearTimers()
      timeoutId = window.setTimeout(() => startDeleting(), props.pauseMs)
    }
  } else {
    activeCharIndex.value = Math.max(activeCharIndex.value - 1, 0)
    displayedText.value = currentWord.slice(0, activeCharIndex.value)
    if (activeCharIndex.value <= 0) {
      isDeleting.value = false
      activeWordIndex.value = (activeWordIndex.value + 1) % words.length
      startTyping()
    }
  }
}

onMounted(() => {
  startTyping()
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <span class="typed-caret">{{ displayedText }}</span>
</template>

<style scoped>
.typed-caret::after { content: '|'; margin-left: 2px; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>
