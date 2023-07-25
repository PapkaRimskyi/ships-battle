<template>
  <div class="interface-of-round-container">
    <ShipsInfo :ships-number-by-category="playerLife" />
    <div class="count-container">
      <TurnIndicator player-type="PLAYER" :turn="turn" />
      <RoundCounter>{{ turnNumber }}</RoundCounter>
      <TurnIndicator player-type="AI" :turn="turn" />
    </div>
    <ShipsInfo :ships-number-by-category="aiLife" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import ShipsInfo from "@/views/game/stages/action/interface-of-round/ships-info/ShipsInfo.vue";
import TurnIndicator from "@/views/game/stages/action/interface-of-round/turn-indicator/TurnIndicator.vue";
import RoundCounter from "@/views/game/stages/action/interface-of-round/round-counter/RoundCounter.vue";

import { TCellsWithShip } from "@/const/ships";
import type { PLAYER_ENUM } from "@/const/common";


type TProps = {
  turn: PLAYER_ENUM,
  turnNumber: number,
  playerSlots: TCellsWithShip,
  aiSlots: TCellsWithShip,
}

const props = defineProps<TProps>();

const playerLife = computed(() => countShipsLife(props.playerSlots));
const aiLife = computed(() => countShipsLife(props.aiSlots));

function countShipsLife(slots: TCellsWithShip) {
  return Object.values(slots).reduce((acc, current) => {
    if (current.isAlive) {
      if (current.type in acc) {
        acc[current.type] += 1;
      } else {
        acc[current.type] = 1;
      }
    } else {
      if (!(current.type in acc)) {
        acc[current.type] = 0;
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

  .count-container {
    position: relative;
  }
</style>
