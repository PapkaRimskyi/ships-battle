<template>
  <div style="display: flex;">
    <BattleHistory
      :dead-cells="deadAiCells"
      :player-slots="aiModule.getListOfShips()"
    />
    <div>
      <Battlefield
        :player-slots="playerSlots"
        :player-table-type="PLAYER_ENUM.PLAYER"
        :dead-cells="aiModule.getListOfDeadPlayerCells()"
      />
      <Battlefield
        :player-slots="aiModule.getListOfShips()"
        :player-table-type="PLAYER_ENUM.AI"
        :dead-cells="deadAiCells"
        @do-player-shot="doPlayerShot"
      />
    </div>
    <BattleHistory
      :dead-cells="aiModule.getListOfDeadPlayerCells()"
      :player-slots="playerSlots"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";

import Battlefield from './battlefield/Battlefield.vue';
import BattleHistory from "@/views/game/components/sidebar/battle-history/BattleHistory.vue";

import AiPlayerModule from "@/helpers/ai-player-module/ai-player-module";

import { TCellsWithShip } from "@/const/ships";
import { PLAYER_ENUM } from "@/const/common";

type TProps = {
  playerSlots: TCellsWithShip,
  deadAiCells: string[],
}

const props = defineProps<TProps>();
const emit = defineEmits({
  destroyPlayerShip(cell: string) {
    return typeof cell === 'string';
  },
  addNewDeadAiCell(cell: string) {
    return typeof cell === 'string';
  },
  endGame(winnerSide: PLAYER_ENUM) {
    return Boolean(PLAYER_ENUM[winnerSide]);
  }
});

const turn = ref(PLAYER_ENUM.PLAYER);
const aiModule = reactive(new AiPlayerModule());

onMounted(() => {
  aiModule.init();
});

watch(turn, () => {
  if (turn.value === PLAYER_ENUM.AI) {
    doAIShot();
  }
});

function doPlayerShot(cell: string) {
  if (!props.deadAiCells.includes(cell)) {
    emit("addNewDeadAiCell", cell);
    if (cell in aiModule.getListOfShips()) {
      aiModule.sinkShip(cell);
      checkAliveShips(aiModule.getListOfShips(), PLAYER_ENUM.PLAYER);
    } else {
      changePlayerTurn();
    }
  }
}

function doAIShot() {
  const pickedCell = aiModule.shot();
  if (pickedCell in props.playerSlots) {
    emit("destroyPlayerShip", pickedCell);
    checkAliveShips(props.playerSlots, PLAYER_ENUM.AI);
  } else {
    changePlayerTurn();
  }
}

function changePlayerTurn() {
  turn.value = turn.value === PLAYER_ENUM.PLAYER ? PLAYER_ENUM.AI : PLAYER_ENUM.PLAYER;
}

function checkAliveShips(playerSlots: TCellsWithShip, playerType: PLAYER_ENUM) {
  if (Object.values(playerSlots).find((ship) => ship.isAlive)) {
    changePlayerTurn();
  } else {
    emit("endGame", playerType);
  }
}
</script>

<style scoped>

</style>
