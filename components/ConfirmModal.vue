<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="close"></div>
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-red-bg rounded-xl">
              <svg class="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-text">{{ title }}</h3>
          </div>
          <p class="text-sm text-text-2 mb-6 leading-relaxed">{{ message }}</p>
          <div class="flex gap-3">
            <button @click="close" class="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-text-2 hover:bg-surface-2 transition-colors">
              Cancel
            </button>
            <button @click="confirm" :disabled="loading" class="flex-1 px-4 py-2.5 bg-red text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50">
              {{ loading ? 'Processing...' : confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Are you sure?'
  },
  message: {
    type: String,
    default: 'This action cannot be undone.'
  },
  confirmText: {
    type: String,
    default: 'Delete'
  }
})

const isOpen = ref(false)
const loading = ref(false)

let resolvePromise = null

const open = () => {
  isOpen.value = true
  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

const close = () => {
  isOpen.value = false
  if (resolvePromise) {
    resolvePromise(false)
    resolvePromise = null
  }
}

const confirm = async () => {
  loading.value = true
  if (resolvePromise) {
    resolvePromise(true)
  }
  loading.value = false
  close()
}

defineExpose({ open })
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(95%);
}
</style>
