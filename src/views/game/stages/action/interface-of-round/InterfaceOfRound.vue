<template>
  <div class="interface-of-round-container">
    <ShipsInfo :ships-number-by-category="test1" />
    <RoundCounter>{{ turnNumber }}</RoundCounter>
    <ShipsInfo :ships-number-by-category="test2" />
  </div>
</template>

<script setup lang="ts">
import ShipsInfo from "@/views/game/stages/action/interface-of-round/ships-info/ShipsInfo.vue";
import RoundCounter from "@/views/game/stages/action/interface-of-round/round-counter/RoundCounter.vue";

import type { TCellsWithShip } from "@/const/ships";
import {computed} from "vue";

type TProps = {
  turnNumber: number,
  playerSlots: TCellsWithShip,
  aiSlots: TCellsWithShip,
}

const props = defineProps<TProps>();

const test1 = computed(() => count(props.playerSlots));
const test2 = computed(() => count(props.aiSlots));

function count(slots: TCellsWithShip) {
  return Object.values(slots).reduce((acc, current) => {
    if (current.type in acc) {
      acc[current.type] += 1;
    } else {
      if (current.isAlive) {
        acc[current.type] = 1;
      }
    }
    return acc;
  }, {});
}
</script>

<style lang="scss" scoped>
  .interface-of-round-container {
    margin-bottom: 60px;
    display: flex;
    justify-content: space-evenly;
  }
</style>
