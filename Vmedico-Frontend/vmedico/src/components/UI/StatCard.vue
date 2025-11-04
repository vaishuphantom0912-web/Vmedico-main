<template>
  <div class="p-2 text-center">
    <div :class="['font-extrabold text-blue-700', small ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl']">{{ value }}</div>
    <div :class="['mt-2 text-slate-600', small ? 'text-base' : 'text-lg']">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    small: { type: Boolean, default: false }
  }
}
</script>

