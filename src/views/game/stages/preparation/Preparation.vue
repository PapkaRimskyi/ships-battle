<template>
  <StageChangeButton v-if="areAllShipsDeployed" @click="emit('startGame', playerSlots)">В бой!</StageChangeButton>
  <ShipsForDeploying
    :ship-type-for-deployment="shipTypeForDeployment"
    :ships-for-deployment="shipsForDeployment"
    @pick-ship-type-for-deployment="pickShipTypeForDeployment"
  />
  <Battlefield
    :player-slots="playerSlots"
    :ship-type-for-deployment="shipTypeForDeployment"
    @registration-ship="registrationShip"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import _ from "lodash";

import StageChangeButton from "@/components/stage-change-button/StageChangeButton.vue";
import ShipsForDeploying from "@/views/game/stages/preparation/ships-for-deploying/ShipsForDeploying.vue";
import Battlefield from "@/views/game/stages/preparation/battlefield/Battlefield.vue";

import {
  getShipObject,
  SHIPS_TYPE_ENUM,
  ShipsForDeployment,
  TCellsWithShip,
  TShip,
  TShipForDeployment
} from "@/const/ships";
import { MAX_SHIPS_ON_SIDE } from "@/const/common";

const emit = defineEmits({
  startGame(playerSlots: TCellsWithShip) {
    return typeof playerSlots === 'object' && playerSlots !== null;
  },
});

const playerSlots = ref<TCellsWithShip>({});
const shipsForDeployment = ref(_.cloneDeep(ShipsForDeployment) as TShipForDeployment[]);
const shipTypeForDeployment = ref<SHIPS_TYPE_ENUM | null>(null);

const currentShipForDeployment = computed(() =>
  shipTypeForDeployment.value
    ? findShipForDeployment(shipTypeForDeployment.value!)
    : undefined
);

const doesCurrentShipHitMaxLimit = computed(() =>
  currentShipForDeployment.value
    ? currentShipForDeployment?.value?.currentAmount === currentShipForDeployment?.value?.maxAmount
    : null
);

const areAllShipsDeployed = computed(() =>
  shipsForDeployment.value.reduce((prev, current) => prev + current.currentAmount, 0) === MAX_SHIPS_ON_SIDE
);

watch(doesCurrentShipHitMaxLimit, (bool) => {
  if (bool) {
    shipTypeForDeployment.value = null;
  }
});

function findShipForDeployment(shipTypeForDeployment: SHIPS_TYPE_ENUM) {
  return shipsForDeployment.value.find((ship) => ship.type === shipTypeForDeployment);
}

function pickShipTypeForDeployment(shipType: SHIPS_TYPE_ENUM) {
  shipTypeForDeployment.value = shipType;
}

function registrationShip(cellID: string) {
  if (shipTypeForDeployment.value) {
    if (cellID in playerSlots.value) {
      if (playerSlots.value[cellID].type === shipTypeForDeployment.value) {
        currentShipForDeployment.value!.currentAmount -= 1;
        delete playerSlots.value[cellID];
      } else {
        const oldShipForDeployment = findShipForDeployment(playerSlots.value[cellID].type);
        const newShipForDeployment = findShipForDeployment(shipTypeForDeployment.value!);
        oldShipForDeployment.currentAmount -= 1;
        newShipForDeployment.currentAmount += 1;
        playerSlots.value[cellID] = getShipObject(shipTypeForDeployment.value!)!;
      }
    } else {
      currentShipForDeployment.value!.currentAmount += 1;
      playerSlots.value[cellID] = getShipObject(shipTypeForDeployment.value!)!;
    }
  } else if (!shipTypeForDeployment.value && cellID in playerSlots.value) {
    const currentSlot = playerSlots.value[cellID] as TShip;
    const currentShipForDeployment = findShipForDeployment(currentSlot.type as SHIPS_TYPE_ENUM);
    currentShipForDeployment.currentAmount -= 1;
    delete playerSlots.value[cellID];
  }
}
</script>
