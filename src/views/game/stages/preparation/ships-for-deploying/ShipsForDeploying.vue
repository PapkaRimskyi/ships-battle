<template>
  <section style="margin-bottom: 24px">
    <ul class="ships-list">
      <li
        class="ship-item"
        v-for="ship in shipsForDeployment"
        :key="ship.type"
        :class="[ship.currentAmount === ship.maxAmount ? 'ship-item--inactive' : '']"
      >
        <div class="ship-img-container" :class="[shipTypeForDeployment === ship.type ? 'ship-img-container--active' : '']" @click="ship.currentAmount !== ship.maxAmount ? emit('pickShipTypeForDeployment', ship.type) : null">
          <img :src="`./src/assets/img/${ship.type}.png`" :alt="ship.type">
        </div>
        <p>{{ ship.name }} - {{ ship.currentAmount }} ({{ ship.maxAmount }})</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { SHIPS_TYPE_ENUM, ShipsForDeployment } from "@/const/ships";

type TProps = {
  shipTypeForDeployment: SHIPS_TYPE_ENUM | null,
  shipsForDeployment: typeof ShipsForDeployment,
}

const emit = defineEmits({
  pickShipTypeForDeployment(shipType: SHIPS_TYPE_ENUM) {
    return Boolean(SHIPS_TYPE_ENUM[shipType]);
  }
});

defineProps<TProps>();
</script>

<style lang="scss" scoped>
.ships-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ship-item {
  display: flex;
  align-items: flex-end;

  &--inactive {
    opacity: .5;

    & img {
      cursor: not-allowed !important;
    }
  }
}

.ship-img-container {
  margin-right: 8px;
  padding: 2px;
  width: 40px;
  height: 40px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(#7FB585, .5);
  }

  &--active {
    background-color: rgba(#7FB585, 1);
  }

  & img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
}
</style>
