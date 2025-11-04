<template>
  <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm card-hover">
    <div class="flex items-center gap-2">
      <span v-if="icon" class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">{{ icon }}</span>
      <h3 class="text-lg font-semibold text-blue-900">{{ title }}</h3>
    </div>
    <p class="mt-2 text-slate-700">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, default: '' }
  }
}
</script>

