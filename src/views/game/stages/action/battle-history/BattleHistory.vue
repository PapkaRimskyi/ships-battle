<template>
  <div class="container">
    <div class="heading-container">
      <h2>Выстрелы</h2>
    </div>
    <div class="shots-container" ref="shotsContainerRef">
      <ShotMessage v-for="(cell, index) in deadCells" :key="cell" :turn-number="index + 1" :cell="cell" :is-ship-sunk="Boolean(cell in playerSlots)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import ShotMessage from "@/views/game/stages/action/battle-history/shot-message/ShotMessage.vue";

import { TCellsWithShip } from "@/const/ships";

type TProps = {
  playerSlots: TCellsWithShip,
  deadCells: string[],
};

const props = defineProps<TProps>();

const shotsContainerRef = ref<HTMLDivElement | null>(null);

watch(props.deadCells, () => {
  (shotsContainerRef.value as HTMLDivElement).scrollTop = (shotsContainerRef.value as HTMLDivElement).scrollHeight;
}, { flush: 'post' });
</script>

<style lang="scss" scoped>
.container {
  width: 120px;
}

.heading-container {
  margin-bottom: 16px;
  text-align: center;

  & h2 {
    font-weight: 700;
    font-size: 18px;
  }
}

.shots-container {
  max-height: 610px;
  overflow: auto;

  & > div {
    margin-top: 8px;
  }
}
</style>
