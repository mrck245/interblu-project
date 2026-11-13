<script setup>
import { pageSwapped } from '@/lib/pageTransition'
</script>

<template>
  <!-- Fundido suave entre páginas: la anterior se desvanece y la nueva
       aparece subiendo unos píxeles. -->
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in" @enter="pageSwapped">
      <div :key="route.path" class="page">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>

<style>
/* Se comporta igual que <main> para que las páginas mantengan su layout */
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-leave-active {
  transition: opacity var(--dur-fast) ease;
}
.page-enter-active {
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.page-leave-to {
  opacity: 0;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
