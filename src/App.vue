<script setup>
import Header from "@/views/header/Header.vue";
</script>

<template>
<!--  <Header />-->

  <main class="main">
    <RouterView />
  </main>

</template>

<style scoped>
.main {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
