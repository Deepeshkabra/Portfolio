<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

// const points = computed(() => {
//   const text = props.page?.about?.description || ''
//   return text
//     .split('\n')
//     .map(s => s.trim())
//     .filter(Boolean)
//     .map(s => s.replace(/^\s*[-•]\s*/, ''))
// })

</script>

<template>
  <UPageSection
    :title="props.page.about.title"
    :ui="{
      container: '!pt-0',
      title: '!mx-auto text-center text-4xl sm:text-5xl lg:text-5xl font-extrabold',
      description: '!mx-auto px-12 text-left mt-8 max-w-3xl text-base sm:text-lg lg:text-base text-muted text-pretty'
    }"
    class="!py-0"
  >
    <template #description>
      <div class="space-y-4">
        <p
          v-for="(p, i) in (props.page.about.paragraphs?.length ? props.page.about.paragraphs : (props.page.about.description || '').split(/\n\s*\n+/).filter(Boolean))"
          :key="i"
        >{{ p }}</p>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
