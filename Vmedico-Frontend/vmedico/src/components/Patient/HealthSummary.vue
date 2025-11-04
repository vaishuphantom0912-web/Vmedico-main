<template>
  <Card title="Health Summary" padding="p-4">
    <div class="space-y-4">
      <div 
        v-for="metric in metrics" 
        :key="metric.id"
        class="flex items-center justify-between p-3 rounded-lg"
        :class="metric.backgroundClass"
      >
        <div class="flex items-center gap-3">
          <component :is="metric.icon" :class="metric.iconClass" />
          <div>
            <p class="text-sm font-medium text-gray-700">{{ metric.label }}</p>
            <p class="text-xs text-gray-500">{{ metric.description }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold" :class="metric.valueClass">
            {{ metric.value }}
          </span>
          <span 
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            :class="metric.statusClass"
          >
            {{ metric.status }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="mt-4 pt-4 border-t border-gray-200">
      <Button 
        variant="ghost" 
        size="sm" 
        full-width
        @click="handleViewAll"
      >
        View All Metrics
      </Button>
    </div>
  </Card>
</template>

<script>
import { computed } from 'vue'
import Card from './base/Card.vue'
import Button from './base/Button.vue'

// Icon Components
const HeartIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
  `
}

const ScaleIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
    </svg>
  `
}

export default {
  name: 'HealthSummary',
  components: {
    Card,
    Button,
    HeartIcon,
    ScaleIcon
  },
  props: {
    metrics: {
      type: Array,
      default: () => []
    }
  },
  emits: ['view-all'],
  setup(props, { emit }) {
    const defaultMetrics = [
      {
        id: 'blood-pressure',
        label: 'Blood Pressure',
        description: 'Last checked: Today',
        value: '120/80',
        status: 'Normal',
        icon: HeartIcon,
        iconClass: 'w-5 h-5 text-green-600',
        valueClass: 'text-gray-800',
        statusClass: 'bg-green-100 text-green-800',
        backgroundClass: 'bg-green-50'
      },
      {
        id: 'heart-rate',
        label: 'Heart Rate',
        description: 'Resting rate',
        value: '72 bpm',
        status: 'Normal',
        icon: HeartIcon,
        iconClass: 'w-5 h-5 text-green-600',
        valueClass: 'text-gray-800',
        statusClass: 'bg-green-100 text-green-800',
        backgroundClass: 'bg-green-50'
      },
      {
        id: 'weight',
        label: 'Weight',
        description: 'Last updated: 2 days ago',
        value: '70 kg',
        status: 'Stable',
        icon: ScaleIcon,
        iconClass: 'w-5 h-5 text-blue-600',
        valueClass: 'text-gray-800',
        statusClass: 'bg-blue-100 text-blue-800',
        backgroundClass: 'bg-blue-50'
      }
    ]

    const metrics = computed(() => {
      return props.metrics.length > 0 ? props.metrics : defaultMetrics
    })

    const handleViewAll = () => {
      emit('view-all')
    }

    return {
      metrics,
      handleViewAll
    }
  }
}
</script>
