<template>
  <div class="turn-indicator" :style="[indicatorSideStyles, isIndicatorActive]" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PLAYER_ENUM } from "@/const/common";

type TProps = {
  playerType: PLAYER_ENUM,
  turn: PLAYER_ENUM,
}

const props = defineProps<TProps>();

const indicatorSideStyles = computed(() => props.playerType === PLAYER_ENUM.PLAYER ? 'left: -50%;' : 'right: -50%;');
const isIndicatorActive = computed(() => props.playerType === props.turn ? '' : 'animation-name: none');
</script>

<style lang="scss" scoped>
@keyframes indicatorPulsing {
  0% {
    background-color: black;
    transform: scale(1);
  }
  50% {
    background-color: green;
    transform: scale(1.5);
  }
  100% {
    background-color: black;
    transform: scale(1);
  }
}

.turn-indicator {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background-color: black;
  animation: indicatorPulsing 1.5s linear infinite;
  border-radius: 50%;
}
</style>
