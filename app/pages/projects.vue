<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page" class="projects-page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            :ui="{ base: 'bg-[#00DC82] hover:bg-[#00DC82]/80' }"
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <div class="flex items-center justify-between flex-wrap gap-3">
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
                <!-- <ULink :to="project.url" class="text-sm text-primary flex items-center">
                  View Project
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </ULink> -->
              </div>
            </div>
          </template>
          <div class="flex flex-col">
            <img
              :src="project.image"
              :alt="project.title"
              class="object-cover w-full h-48 rounded-lg"
            >
            <div v-if="project.tech?.length" class="flex flex-wrap gap-2 mt-3">
              <UBadge
                v-for="(t, i) in project.tech"
                :key="i"
                variant="soft"
                color="neutral"
                class="gap-1"
              >
                <UIcon v-if="t.icon" :name="t.icon" class="size-4" />
                {{ t.name }}
              </UBadge>
            </div>
          </div>
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>

<style scoped>
@media (min-width: 1024px) {
  .projects-page { --ui-container: var(--container-6xl); }
}
</style>
