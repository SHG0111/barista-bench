<template>
  <Teleport to="body">
    <div class="toast-wrap">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id" class="toast">
          <span class="toast-ico">{{ t.icon }}</span>
          <span>{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast()
</script>

<style scoped>
.toast-wrap {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  display: flex; flex-direction: column; gap: 10px;
  pointer-events: none;
}
.toast {
  background: var(--bg-dark); color: white;
  padding: 12px 18px; border-radius: 10px;
  font-size: 13px;
  display: flex; align-items: center; gap: 10px;
  pointer-events: auto; max-width: 340px; border: 1px solid #333;
}
.toast-ico { font-size: 15px; opacity: 0.9; }
.toast-enter-active, .toast-leave-active { transition: all 0.22s ease; }
.toast-enter-from, .toast-leave-to {
  opacity: 0; transform: translateX(20px) scale(0.95);
}
</style>
