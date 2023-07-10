<template>
  <div class="battlefield-container">
    <Preparation v-if="mode === GAME_STAGE_ENUM.PREPARING" @start-game="startGame" />
    <Action
      v-else-if="mode === GAME_STAGE_ENUM.IN_ACTION"
      :player-slots="player.slots"
      :dead-ai-cells="player.deadAiCells"
      @destroy-player-ship="destroyPlayerShip"
      @add-new-dead-ai-cell="addNewDeadAiCell"
      @end-game="endGame"
    />
    <div v-else>
      <p v-if="winner === PLAYER_ENUM.PLAYER">Вы победили</p>
      <p v-else>Вы проиграли</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import Preparation from "@/views/game/stages/preparation/Preparation.vue";
import Action from "@/views/game/stages/action/Action.vue";

import { GAME_STAGE_ENUM, PLAYER_ENUM } from "@/const/common";
import { TCellsWithShip } from "@/const/ships";

const mode = ref(GAME_STAGE_ENUM.PREPARING);
const player = reactive<{ slots: TCellsWithShip, deadAiCells: string[] }>({
  slots: {},
  deadAiCells: [],
});
const winner = ref<PLAYER_ENUM | null>(null);

function startGame(slots: TCellsWithShip) {
  player.slots = slots;
  mode.value = GAME_STAGE_ENUM.IN_ACTION;
}

function endGame(winnerSide: PLAYER_ENUM) {
  mode.value = GAME_STAGE_ENUM.FINISHED;
  winner.value = winnerSide;
}

function destroyPlayerShip(cell: string) {
  player.slots[cell].isAlive = false;
}

function addNewDeadAiCell(cell: string) {
 player.deadAiCells.push(cell);
}
</script>

<style lang="scss" scoped>
.battlefield-container {
  display: flex;
  flex-direction: column;
}
</style>
