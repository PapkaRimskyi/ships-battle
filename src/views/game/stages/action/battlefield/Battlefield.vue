<template>
  <section class="container">
    <div v-if="playerTableType === PLAYER_ENUM.PLAYER" class="row-number-container">
      <div v-for="number in GAME_FIELDS_NUMBER" class="row-number-item" :key="number">{{ number }}</div>
    </div>
    <div class="row" :class="[playerTableType === PLAYER_ENUM.AI ? 'row--enemy' : '']" v-for="field in getGameFieldsForRender()" :key="field[0][0]">
      <div class="row-name">{{ field[0][0] }}</div>
      <div
        v-for="cell in field"
        :id="cell"
        class="cell"
        :class="[deadCells.includes(cell) ? 'cell--dead-cell' : '', cellColorComputed]"
        @click="playerTableType === PLAYER_ENUM.AI ? doPlayerShot($event, cell) : null"
        :key="cell"
      >
        <img
          v-if="calculateConditionForShowingImg(cell)"
          :src="`./src/assets/img/${defineImgForShipInCell(cell)}.png`"
          alt=" "
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { AI_FIELDS_START_ROW_NUMBER, GAME_FIELDS, GAME_FIELDS_NUMBER } from "@/const/game-field";
import { PLAYER_ENUM } from "@/const/common";

import type { TCellsWithShip } from "@/const/ships";

type TProps = {
  playerSlots: TCellsWithShip,
  playerTableType: PLAYER_ENUM,
  deadCells: string[],
}

const emit = defineEmits({
  doPlayerShot(cell: string) {
    return typeof cell === 'string';
  },
});

const props = defineProps<TProps>();

const cellColorComputed = computed(() => props.playerTableType === PLAYER_ENUM.PLAYER ? 'cell--player' : 'cell--enemy');

function getGameFieldsForRender() {
  return props.playerTableType === PLAYER_ENUM.PLAYER ? GAME_FIELDS.slice(0, AI_FIELDS_START_ROW_NUMBER) : GAME_FIELDS.slice(AI_FIELDS_START_ROW_NUMBER);
}

function doPlayerShot(e: Event, cell: string) {
  emit('doPlayerShot', cell);
}

function calculateConditionForShowingImg(cell: string) {
  if (props.playerTableType === PLAYER_ENUM.PLAYER) {
    return props.playerSlots[cell];
  }
  return props.playerSlots[cell] && !props.playerSlots[cell].isAlive;
}

function defineImgForShipInCell(cell: string) {
  if (props.playerTableType === PLAYER_ENUM.PLAYER || (props.playerSlots[cell] && !props.playerSlots[cell].isAlive)) {
    return props.playerSlots[cell].type;
  }
}
</script>

<style lang="scss" scoped>
.container {
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

  &--enemy {
    cursor: url("../../../../../assets/img/crosshair.png") 12 12, pointer;
  }
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
  overflow: hidden;

  &--player {
    background-color: var(--player-battlefield-cell-color);
  }

  &--enemy {
    background-color: var(--enemy-battlefield-cell-color);
  }

  &--dead-cell {
    opacity: .5;
    pointer-events: none;
  }
}
</style>
