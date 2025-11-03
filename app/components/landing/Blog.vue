<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: projects } = await useAsyncData('index-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all()
)

const expanded = ref<boolean[]>([])
const isTruncated = ref<boolean[]>([])
const descriptionRefs = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  nextTick(() => {
    projects.value?.forEach((_, i) => {
      const el = descriptionRefs.value[i]
      if (el) {
        isTruncated.value[i] = el.scrollHeight > el.clientHeight
      }
    })
  })
})
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 py-10 sm:gap-6 lg:gap-8',
      title: '!mx-auto text-center text-4xl sm:text-4xl lg:text-5xl font-extrabold',
      description: '!mx-0 text-center mt-6 text-base sm:text-lg lg:text-base text-muted'
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UPageCard
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        variant="subtle"
        class="group bg-elevated/60 card-tilt"
        :ui="{ wrapper: 'overflow-visible' }"
      >
        <template #description>
          <p
            :ref="el => (descriptionRefs[index] = el as HTMLElement)"
            :class="['desc', !expanded[index] && 'clamp-4']"
          >
            {{ project.description }}
          </p>
          <UButton
            v-if="isTruncated[index]"
            size="xs"
            variant="link"
            :label="expanded[index] ? 'Read less' : 'Read more'"
            class="mt-1"
            @click="expanded[index] = !expanded[index]"
          />
        </template>
        <template #footer>
          <div class="flex items-center justify-between flex-wrap gap-3">
            <span class="text-sm text-muted">{{ new Date(project.date).getFullYear() }}</span>
            <div class="flex items-center gap-2">
              <UButton
                v-if="project.demo"
                label="Live Demo"
                icon="i-lucide-external-link"
                :to="project.demo"
                target="_blank"
              />
              <UButton
                v-if="project.github"
                label="GitHub"
                icon="i-simple-icons-github"
                :to="project.github"
                target="_blank"
                color="neutral"
                variant="outline"
              />
            </div>
          </div>
        </template>
        <div class="flex flex-col">
          <img
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          >
          <div
            v-if="project.tech?.length"
            class="flex flex-wrap gap-2 mt-3"
          >
            <UBadge
              v-for="(t, i) in project.tech"
              :key="i"
              variant="soft"
              color="neutral"
              class="gap-1"
            >
              <UIcon
                v-if="t.icon"
                :name="t.icon"
                class="size-4"
              />
              {{ t.name }}
            </UBadge>
          </div>
        </div>
      </UPageCard>
    </div>
  </UPageSection>
</template>

<style scoped>
.desc { transition: max-height .2s ease; }
.clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* .card-tilt {
  transform-origin: center;
  transition: transform .25s ease, box-shadow .25s ease;
  will-change: transform;
}
.card-tilt:hover { transform: skew(-3deg, -3deg); }
@media (prefers-reduced-motion: reduce) {
  .card-tilt, .card-tilt:hover { transition: none; transform: none; }
} */
</style>
