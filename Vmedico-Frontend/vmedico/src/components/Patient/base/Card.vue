<template>
  <div 
    :class="[
      'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300',
      paddingClass,
      elevationClass
    ]"
  >
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
    </div>
    
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: 'p-6'
    },
    elevation: {
      type: String,
      default: 'md'
    }
  },
  setup(props) {
    const paddingClass = computed(() => {
      const paddingMap = {
        'sm': 'p-4',
        'md': 'p-6',
        'lg': 'p-8',
        'none': 'p-0'
      }
      return paddingMap[props.padding] || props.padding
    })

    const elevationClass = computed(() => {
      const elevationMap = {
        'sm': 'shadow-sm',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
        'xl': 'shadow-xl'
      }
      return elevationMap[props.elevation] || 'shadow-md'
    })

    return { paddingClass, elevationClass }
  }
}
</script>

<style scoped>
/* Material Design card hover effect */
.card-hover {
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
}
</style>

