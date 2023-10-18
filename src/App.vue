<script setup lang="ts">

</script>

<template>
  <Transition name="fade">
    <section>
      <RouterView />
    </section>
  </Transition>
</template>
<style scoped>
section {
    @apply max-w-sm mx-auto flex flex-col w-[100vw] h-[100vh] items-center justify-center;
}
</style>
