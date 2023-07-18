<template>
  <div class="life-marker-container" :style="{ backgroundImage: makeHpConicGradient() }" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const BORDER_DEGREE_NUMBER = 6;

type TProps = {
  lifeNumber: number,
}

const props = defineProps<TProps>();

const initHealth = ref(props.lifeNumber);

function makeHpConicGradient() {
  const sectionDegree = (360 / initHealth.value) - (BORDER_DEGREE_NUMBER * 2);
  const currentHp = props.lifeNumber !== 0 ? initHealth.value - props.lifeNumber : 0;
  let conicGradientStyle = [];
  let nextStartDegreeFrom = 0;
  if (initHealth.value === 1) {
    const colorForHpSection = props.lifeNumber ? 'green' : 'red';
    return `conic-gradient(from ${nextStartDegreeFrom}deg, ${colorForHpSection}, ${colorForHpSection})`;
  }
  for (let i = 0; i < initHealth.value; i++) {
    const colorForHpSection = i < currentHp ? 'red' : 'green';
    const maxDegreeForBorder = nextStartDegreeFrom + BORDER_DEGREE_NUMBER;
    const maxDegreeForHp = maxDegreeForBorder + sectionDegree;
    conicGradientStyle.push(`black ${nextStartDegreeFrom}deg, black ${maxDegreeForBorder}deg, ${colorForHpSection} ${maxDegreeForBorder}deg, ${colorForHpSection} ${maxDegreeForHp}deg, black ${maxDegreeForHp}deg, black ${maxDegreeForHp + BORDER_DEGREE_NUMBER}deg`);
    nextStartDegreeFrom = maxDegreeForHp + BORDER_DEGREE_NUMBER;
  }
  return `conic-gradient(${conicGradientStyle.join(', ')})`;
}
</script>

<style lang="scss" scoped>
  .life-marker-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
</style>
