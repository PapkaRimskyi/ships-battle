<template>
  <Battlefield
    :player-table-type="PLAYER_ENUM.PLAYER"
    :ship-slots="playerSlots"
  />
  <Battlefield
    :player-table-type="PLAYER_ENUM.AI"
    :ship-slots="aiModule.getListOfShips()"
    @do-player-shot="doPlayerShot"
  />
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

import Battlefield from './battlefield/Battlefield.vue';

import AiPlayerModule from "@/helpers/ai-player-module/ai-player-module";

import {TCellsWithShip} from "@/const/ships";
import {PLAYER_ENUM} from "@/const/common";

type TProps = {
  playerSlots: TCellsWithShip,
}

const props = defineProps<TProps>();
const emit = defineEmits({
  destroyPlayerShip(cell: string) {
    return typeof cell === 'string';
  },
  endGame(winnerSide: PLAYER_ENUM) {
    return Boolean(PLAYER_ENUM[winnerSide]);
  }
});

const turn = ref(PLAYER_ENUM.PLAYER);
const aiModule = ref(new AiPlayerModule());

onMounted(() => {
  aiModule.value.init();
})

watch(turn, () => {
  if (turn.value === PLAYER_ENUM.AI) {
    doAIShot();
  }
});

function doPlayerShot(cell: string) {
  if (cell in aiModule.value.getListOfShips()) {
    aiModule.value.sinkShip(cell);
    checkAliveShips(aiModule.value.getListOfShips(), PLAYER_ENUM.PLAYER);
  } else {
    changePlayerTurn();
  }
}

function doAIShot() {
  const pickedCell = aiModule.value.shot();
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
