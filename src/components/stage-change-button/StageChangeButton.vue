<template>
  <div class="container">
    <button class="button" type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts" />

<style lang="scss" scoped>
.container {
  width: 100%;
}
.button {
  margin-bottom: 16px;
  padding: 10px;
  width: 100%;
  background-color: #f5f5f5;
  border: 1px solid #000000;
  border-radius: 8px;
}
</style>
