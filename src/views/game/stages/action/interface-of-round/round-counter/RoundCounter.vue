<template>
  <div class="round-counter-container">
    <p class="round-number">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.round-counter-container {
  padding: 20px 0;
  width: 102px;
  background: radial-gradient(circle 70px at 76% 27%, #cfe7fa ,#6393c1);
  box-shadow: 0 0 16px 10px #8aa5b5;
  border-radius: 50%;
}

.round-number {
  font-size: 56px;
  line-height: 62px;
  text-align: center;
}
</style>
