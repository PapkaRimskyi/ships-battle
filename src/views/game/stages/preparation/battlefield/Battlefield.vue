<template>
  <section class="container">
    <div class="row-number-container">
      <div v-for="number in GAME_FIELDS_NUMBER" class="row-number-item" :key="number">{{ number }}</div>
    </div>
    <div class="row" v-for="field in GAME_FIELDS.slice(0, 5)" :key="field[0][0]">
      <div class="row-name">{{ field[0][0] }}</div>
      <div :id="cell" class="cell" @mouseenter="onCellHoverStart" @mouseleave="onCellHoverEnd" @click="placeShip" v-for="cell in field" :key="cell">
        <img
          v-if="hoveredCell === cell || playerSlots[cell]"
          :src="defineWhichImageToShow(cell)"
          alt=" "
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { GAME_FIELDS_NUMBER, GAME_FIELDS } from "@/const/game-field";
import { SHIPS_TYPE_ENUM, TCellsWithShip, TShip } from "@/const/ships";

type TProps = {
  playerSlots: TCellsWithShip,
  shipTypeForDeployment: SHIPS_TYPE_ENUM | null,
}

const emit = defineEmits({
  registrationShip(id: string) {
    return typeof id === 'string';
  },
});
const props = defineProps<TProps>();

const hoveredCell = ref<string | null>(null);

function onCellHoverStart(e: Event) {
  if (props.shipTypeForDeployment) {
    hoveredCell.value = (e.currentTarget as HTMLDivElement).id;
  }
}

function defineWhichImageToShow(cellID: string) {
  if (hoveredCell.value && hoveredCell.value === cellID && props.shipTypeForDeployment) {
    if (hoveredCell.value in props.playerSlots) {
      const ship = props.playerSlots[hoveredCell.value] as TShip;
      return props.shipTypeForDeployment !== ship.type
        ? `./src/assets/img/${props.shipTypeForDeployment}.png`
        : `./src/assets/img/${ship.type}.png`;
    }
    return `./src/assets/img/${props.shipTypeForDeployment}.png`;
  }
  return `./src/assets/img/${props.playerSlots[cellID].type}.png`;
}

function onCellHoverEnd() {
  hoveredCell.value = null;
}

function placeShip(e: Event) {
  emit('registrationShip', (e.currentTarget as HTMLDivElement).id);
}

</script>

<style lang="scss" scoped>
.container{
  margin: 0 16px;
  padding-right: 60px;
  border-right: 1px dotted black;
  border-left: 1px dotted black;
}

.row-number-container {
  margin-left: 60px;
  display: flex;
}

.row-number-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
}

.row {
  display: flex;
  align-items: center;
}

.row-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  text-align: center;
}

.cell {
  width: 60px;
  height: 60px;
  background-color: #68A3E5;
  border: 1px solid blue;

  & img {
    cursor: pointer;
  }
}
</style>
