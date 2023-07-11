<template>
  <div>
    <span class="turn-number">{{ turnNumber }}.</span>
    <span class="shot-result">
      <span>{{ cell }} = </span>
      <img width="20" height="20"
        :src="props.isShipSunk ? `./src/assets/img/flame.png` : `./src/assets/img/missed-shot.png`"
        alt=" "
      />
    </span>
  </div>
</template>

<script setup lang="ts">
type TProps = {
  turnNumber: number,
  cell: string,
  isShipSunk: boolean,
}

const props = defineProps<TProps>();
</script>

<style lang="scss" scoped>
.turn-number {
  font-weight: 700;
  text-decoration: underline;
}

.shot-result {
  margin-left: 8px;
}
</style>
