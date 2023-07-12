<template>
  <div class="life-marker-container">
    <div>1</div>
    <div>2</div>
  </div>
</template>

<script setup lang="ts">
type TProps = {
  lifeNumber: number,
}

defineProps<TProps>();
</script>

<style lang="scss" scoped>
  .life-marker-container {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    transform: rotateZ(60deg);
  }
</style>
