<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    class="relative overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  >
    <!-- Ripple effect -->
    <span
      v-if="ripple"
      class="absolute inset-0 rounded-inherit overflow-hidden"
      @click="createRipple"
    >
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        :style="ripple.style"
        class="absolute rounded-full bg-white opacity-30 animate-ping"
      ></span>
    </span>

    <!-- Button content -->
    <span class="relative flex items-center justify-center gap-2">
      <component v-if="icon" :is="icon" :class="iconClasses" />
      <slot />
    </span>
  </button>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object],
      default: null
    },
    ripple: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const ripples = ref([])

    const buttonClasses = computed(() => {
      const baseClasses = 'font-medium rounded-lg focus:ring-offset-2'
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg'
      }
      const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
        secondary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300',
        ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:text-blue-300',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300'
      }
      const widthClasses = props.fullWidth ? 'w-full' : ''

      return [
        baseClasses,
        sizeClasses[props.size],
        variantClasses[props.variant],
        widthClasses,
        props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      ].filter(Boolean).join(' ')
    })

    const iconClasses = computed(() => {
      const sizeMap = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-7 h-7'
      }
      return sizeMap[props.size]
    })

    const createRipple = (event) => {
      if (!props.ripple || props.disabled) return

      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = {
        id: Date.now(),
        style: {
          width: size + 'px',
          height: size + 'px',
          left: x + 'px',
          top: y + 'px'
        }
      }

      ripples.value.push(ripple)

      setTimeout(() => {
        const index = ripples.value.findIndex(r => r.id === ripple.id)
        if (index > -1) {
          ripples.value.splice(index, 1)
        }
      }, 600)
    }

    const handleClick = (event) => {
      if (props.disabled) return
      emit('click', event)
    }

    return {
      buttonClasses,
      iconClasses,
      ripples,
      createRipple,
      handleClick
    }
  }
}
</script>

<style scoped>
/* Ripple animation */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ping {
  animation: ripple 0.6s ease-out;
}
</style>

