<template>
  <div>
    <main><slot></slot></main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.style.backdropFilter = 'blur(10px)'
})

onUnmounted(() => {
  document.body.style.backdropFilter = ''
})
</script>

<style scoped></style>
