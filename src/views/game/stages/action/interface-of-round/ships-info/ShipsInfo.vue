<template>
  <ul class="ships-info-list">
    <li class="ships-info-list__item">
      <LifeMarker :life-number="shipsNumberByCategory[SHIPS_TYPE_ENUM.LINKOR]" />
      <div class="ships-info-list__img-container">
        <img src="../../../../../../assets/img/linkor.png" alt=" ">
      </div>
    </li>
    <li class="ships-info-list__item">
      <LifeMarker :life-number="shipsNumberByCategory[SHIPS_TYPE_ENUM.KREISER]" />
      <div class="ships-info-list__img-container">
        <img src="../../../../../../assets/img/kreiser.png" alt=" ">
      </div>
    </li>
    <li class="ships-info-list__item">
      <LifeMarker :life-number="shipsNumberByCategory[SHIPS_TYPE_ENUM.ESMINEC]" />
      <div class="ships-info-list__img-container">
        <img src="../../../../../../assets/img/esminec.png" alt=" ">
      </div>
    </li>
    <li class="ships-info-list__item">
      <LifeMarker :life-number="shipsNumberByCategory[SHIPS_TYPE_ENUM.TORPEDO]" />
      <div class="ships-info-list__img-container">
        <img src="../../../../../../assets/img/torpedo.png" alt=" ">
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import LifeMarker from "@/views/game/stages/action/interface-of-round/ships-info/life-marker/LifeMarker.vue";

import { SHIPS_TYPE_ENUM } from "@/const/ships";

type TProps = {
  shipsNumberByCategory: { [key: keyof typeof SHIPS_TYPE_ENUM]: number },
}

defineProps<TProps>();
</script>

<style lang="scss" scoped>
.ships-info-list {
  display: flex;
  align-items: center;

  &:first-child {
    flex-direction: row-reverse;
  }

  &__item {
    position: relative;
    margin: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__item:first-child &__img-container {
    width: 65px;
  }

  &__item:nth-child(2) &__img-container {
    width: 55px;
  }

  &__item:nth-child(3) &__img-container {
    width: 45px;
  }

  &__item:last-child &__img-container {
    width: 35px;
  }

  &__img-container {
    background-color: lightblue;
    border-radius: 50%;
    z-index: 1000;

    & img {
      transform: scale(.8);
    }
  }
}
</style>
