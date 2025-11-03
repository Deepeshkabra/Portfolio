<script setup lang="ts">
const { data: certs } = await useAsyncData('certifications', () => queryCollection('certifications').first())
const current = ref(0)
const offset = (i: number, total: number) => {
  const raw = (i - current.value + total) % total
  return raw > total / 2 ? raw - total : raw
}
const styleFor = (i: number) => {
  const total = certs.value?.items.length || 0
  if (!total) return {}
  const o = offset(i, total)
  const abs = Math.abs(o)
  const sign = o < 0 ? -1 : 1
  if (abs === 0) {
    return { transform: 'translateZ(0px) rotateY(0deg) scale(1)', zIndex: 30, opacity: 1 }
  }
  if (abs === 1) {
    return { transform: `translateZ(-60px) rotateY(${sign * 14}deg) scale(0.94)`, zIndex: 20, opacity: 1 }
  }
  return { transform: `translateZ(-160px) rotateY(${sign * 28}deg) scale(0.82)`, zIndex: 10, opacity: 0.65 }
}
</script>

<template>
  <UPageSection
    v-if="certs"
    :title="certs.title"
    :description="certs.description"
    :ui="{
      container: 'px-0',
      title: 'text-center text-4xl sm:text-4xl lg:text-5xl font-extrabold'
    }"
  >
    <div style="perspective: 1200px">
      <UCarousel
        v-slot="{ item, index }"
        :items="certs.items"
        :autoplay="{ delay: 4500 }"
        loop
        arrows
        dots
        :ui="{
          container: '!pt-0 gap-6',
          item: 'px-3 basis-full sm:basis-1/2 lg:basis-1/3',
          viewport: '-mx-4 sm:-mx-12 lg:-mx-16 max-w-(--ui-container)'
        }"
        @select="(i: number) => (current = i)"
      >
        <div
          class="transform-gpu transition-all duration-500 ease-in-out"
          :style="styleFor(index)"
        >
          <UCard class="h-full bg-elevated/60 ring-1 ring-white/10 shadow-2xl">
            <!-- <div class="flex items-center gap-3 text-muted">
              <UIcon v-if="item.issuer.logo" :name="item.issuer.logo" class="text-3xl" />
              <div class="text-sm">
                <div class="font-semibold" :style="{ color: item.issuer.color }">{{ item.issuer.name }}</div>
                <div>{{ item.type }}</div>
              </div>
              <div class="ml-auto text-sm">{{ item.date }}</div>
            </div> -->
            <div class="flex items-center gap-3 text-muted">
              <UIcon
                v-if="item.issuer.logo && item.issuer.logo.startsWith('i-')"
                :name="item.issuer.logo"
                class="text-3xl"
              />
              <img
                v-else-if="item.issuer.logo"
                :src="item.issuer.logo"
                alt=""
                class="h-8 w-8 object-contain"
              >
              <div class="text-sm">
                <div
                  class="font-semibold"
                  :style="{ color: item.issuer.color }"
                >
                  {{ item.issuer.name }}
                </div>
                <div>{{ item.type }}</div>
              </div>
              <div class="ml-auto text-sm">
                {{ item.date }}
              </div>
            </div>
            <h3 class="mt-4 text-2xl font-extrabold">
              {{ item.title }}
            </h3>
            <ul class="mt-4 space-y-1 text-muted">
              <li
                v-for="(b, i) in item.bullets"
                :key="i"
                class="flex gap-2"
              >
                <span class="i-heroicons-check-circle-20-solid text-success" />
                <span>{{ b }}</span>
              </li>
            </ul>
            <div class="mt-6">
              <UButton
                :to="item.url"
                target="_blank"
                icon="i-heroicons-arrow-top-right-on-square"
                color="primary"
              >
                View Credential
              </UButton>
            </div>
          </UCard>
        </div>
      </UCarousel>
    </div>
  </UPageSection>
</template>
