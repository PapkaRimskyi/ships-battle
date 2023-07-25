<template>
  <div class="action-screen-container">
    <InterfaceOfRound
      :turn="turn"
      :turn-number="turnNumber"
      :playerSlots="player.slots"
      :aiSlots="aiModule.getListOfShips()"
    />
    <div style="display: flex; background-color: rgba(255, 255, 255, .3); border-radius: 5px;">
      <BattleHistory
        :dead-cells="player.deadAiCells"
        :player-slots="aiModule.getListOfShips()"
      />
      <div>
        <Battlefield
          :player-slots="player.slots"
          :player-table-type="PLAYER_ENUM.PLAYER"
          :dead-cells="aiModule.getListOfDeadPlayerCells()"
        />
        <Battlefield
          :player-slots="aiModule.getListOfShips()"
          :player-table-type="PLAYER_ENUM.AI"
          :dead-cells="player.deadAiCells"
          @do-player-shot="doPlayerShot"
        />
      </div>
      <BattleHistory
        :dead-cells="aiModule.getListOfDeadPlayerCells()"
        :player-slots="player.slots"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from "vue";

import InterfaceOfRound from "@/views/game/stages/action/interface-of-round/InterfaceOfRound.vue";
import Battlefield from './battlefield/Battlefield.vue';
import BattleHistory from "@/views/game/stages/action/battle-history/BattleHistory.vue";

import AiPlayerModule from "@/helpers/ai-player-module/ai-player-module";

import { TCellsWithShip } from "@/const/ships";
import { PLAYER_ENUM } from "@/const/common";
import {getRandomArbitrary} from "@/helpers/common";

type TProps = {
  player: { slots: TCellsWithShip, deadAiCells: string[] },
}

const props = defineProps<TProps>();
const emit = defineEmits({
  endGame(winnerSide: PLAYER_ENUM) {
    return Boolean(PLAYER_ENUM[winnerSide]);
  }
});

const player = reactive(props.player);
const aiModule = ref(new AiPlayerModule());
const turn = ref(PLAYER_ENUM.PLAYER);
const turnNumber = ref(1);

onBeforeMount(() => {
  aiModule.value.init();
});

watch(turn, () => {
  if (turn.value === PLAYER_ENUM.AI) {
    const randomDelayNumber = getRandomArbitrary(1000, 5000);
    setTimeout(() => {
      doAIShot();
      turnNumber.value += 1;
    }, randomDelayNumber);
  }
});

function doPlayerShot(cell: string) {
  if (!player.deadAiCells.includes(cell) && turn.value !== PLAYER_ENUM.AI) {
    addNewDeadAiCell(cell);
    if (cell in aiModule.value.getListOfShips()) {
      aiModule.value.sinkShip(cell);
      checkAliveShips(aiModule.value.getListOfShips(), PLAYER_ENUM.PLAYER);
    } else {
      changePlayerTurn();
    }
  }
}

function doAIShot() {
  const pickedCell = aiModule.value.shot();
  if (pickedCell in player.slots) {
    destroyPlayerShip(pickedCell);
    checkAliveShips(player.slots, PLAYER_ENUM.AI);
  } else {
    changePlayerTurn();
  }
}

function destroyPlayerShip(cell: string) {
  player.slots[cell].isAlive = false;
}

function addNewDeadAiCell(cell: string) {
  player.deadAiCells.push(cell);
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

<style lang="css" module>
  .action-screen-container {
    display: flex;
    flex-direction: row;
  }
</style>
