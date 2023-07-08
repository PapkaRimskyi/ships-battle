<script>
import ShipsInfo from "@/views/game/components/sidebar/ships-info/ShipsInfo.vue";
import BattleHistory from "@/views/game/components/sidebar/battle-history/BattleHistory.vue";

export default {
  components: { ShipsInfo, BattleHistory },
  props: ['type'],
  data() {
    return {}
  },
  beforeCreate() {
    console.log('created', this.type);
  },
}
</script>

<template>
  <section class="container">
    <div class="heading-container">
      <h1>{{ type }}</h1>
    </div>
    <div class="info-block">
      <ShipsInfo />
    </div>
    <div class="info-block">
      <BattleHistory />
    </div>
  </section>
</template>


<style lang="scss" scoped>
.container {

}

.heading-container {
  margin-bottom: 16px;

  & h1 {
    font-weight: 700;
    font-size: 24px;
  }
}

.info-block {
  margin-bottom: 16px;
}
</style>
