<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()

const name = ref('')
const email = ref('')
const message = ref('Hey Deepesh, love the website! I\'d like to chat about some opportunities you might like!')

const subject = computed(() => `Portfolio inquiry from ${name.value || 'Visitor'}`)
const body = computed(() => `${message.value}\n\nFrom: ${name.value} <${email.value}>`)
const mailto = computed(() => `mailto:${global.email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`)
</script>

<template>
  <UPageSection
    :title="page.faq.title"
    :description="page.faq.description"
    :ui="{
      container: 'px-0 !pt-0 gap-4 sm:gap-4',
      title: '!mx-auto text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold',
      description: 'text-center mt-2 text-base sm:text-lg lg:text-base text-muted py-6'
    }"
  >
    <UCard
      :ui="{ body: 'grid gap-4', header: 'hidden', footer: 'hidden' }"
      class="bg-elevated/60"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormGroup label="Name">
          <UInput
            v-model="name"
            placeholder="Your name"
          />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput
            v-model="email"
            placeholder="Your email"
            type="email"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Message">
        <UTextarea
          v-model="message"
          :rows="8"
        />
      </UFormGroup>
      <div class="flex items-center justify-between">
        <UButton
          :to="mailto"
          label="Send Message"
          size="lg"
        />
      </div>
    </UCard>
  </UPageSection>
</template>
