<template>
  <ul class="ships-info-list">
    <li class="ships-info-list__item">
      <img src="../../../../../../assets/img/linkor.png" alt=" ">
    </li>
    <li class="ships-info-list__item">
      <img src="../../../../../../assets/img/kreiser.png" alt=" ">
    </li>
    <li class="ships-info-list__item">
      <img src="../../../../../../assets/img/esminec.png" alt=" ">
    </li>
    <li class="ships-info-list__item">
      <img src="../../../../../../assets/img/torpedo.png" alt=" ">
    </li>
  </ul>
</template>

<script setup lang="ts">
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
    background-color: lightblue;
    border-radius: 50%;
    overflow: hidden;

    &:first-child {
      width: 65px;
    }

    &:nth-child(2) {
      width: 55px;
    }

    &:nth-child(3) {
      width: 45px;
    }

    &:last-child {
      width: 35px;
    }

    & img {
      transform: scale(.8);
    }
  }
}
</style>
