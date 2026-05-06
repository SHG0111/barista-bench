<template>
  <div
    class="page-loader"
    :class="{ active: isLoading }"
  >
    <div class="page-loader-bar"></div>
  </div>
</template>

<script setup lang="ts">
const isLoading = useState("page-loading", () => false)
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 99999;
  background: transparent;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.page-loader.active {
  opacity: 1;
}

.page-loader-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #b8860b, #d4a437, #b8860b);
  background-size: 200% 100%;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(184, 134, 11, 0.5), 0 0 4px rgba(184, 134, 11, 0.3);
  transition: width 0.1s linear;
}

.page-loader.active .page-loader-bar {
  animation: pageLoaderProgress 2s ease-out forwards, pageLoaderShimmer 0.8s ease-in-out infinite;
}

@keyframes pageLoaderProgress {
  0% { width: 0%; }
  15% { width: 30%; }
  50% { width: 70%; }
  80% { width: 90%; }
  100% { width: 95%; }
}

@keyframes pageLoaderShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
