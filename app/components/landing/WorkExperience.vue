<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.education.title"
    :ui="{
      container: '!pt-0 gap-4 sm:gap-4 !sm:text-wrap',
      title: 'text-center text-4xl sm:text-4xl lg:text-5xl font-extrabold',
      description: 'mt-8'
    }"
    class="!py-2"
  >
    <template #description>
      <div class="flex flex-col gap-3">
        <Motion
          v-for="(experience, index) in page.education.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted flex items-center gap-3"
        >
          <p class="text-base font-medium">
            {{ experience.date }}
          </p>
          <USeparator class="flex-1" />
          <ULink
            class="flex items-center gap-1"
            :to="experience.company.url"
            target="_blank"
          >
            <span class="text-base font-medium">
              {{ experience.position }}
            </span>
            <div
              class="inline-flex items-center gap-1"
              :style="{ color: experience.company.color }"
            >
              <span class="font-semibold">{{ experience.company.name }}</span>
              <UIcon
                v-if="experience.company.logo"
                :name="experience.company.logo"
              />
            </div>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
