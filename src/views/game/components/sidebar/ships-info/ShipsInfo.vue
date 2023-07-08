<script>
export default {

}
</script>

<template>
  <div>
    <div class="heading-container">
      <h2>Корабли</h2>
    </div>
    <ul class="ships-list">
      <li>
        <div class="icon-container">
          <img src="../../../../../assets/img/linkor.png" alt="Линкор">
        </div>
        <h3>Линкор - 1 (1)</h3>
      </li>
      <li>
        <div class="icon-container">
          <img src="../../../../../assets/img/kreiser.png" alt="Крейсер">
        </div>
        <h3>Крейсер - 2 (2)</h3>
      </li>
      <li>
        <div class="icon-container">
          <img src="../../../../../assets/img/esminec.png" alt="Эсминец">
        </div>
        <h3>Эсминец - 3 (3)</h3>
      </li>
      <li>
        <div class="icon-container">
          <img src="../../../../../assets/img/torpedo.png" alt="Подлодка">
        </div>
        <h3>Подлодка - 4 (4)</h3>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.heading-container {
  margin-bottom: 16px;

  & h2 {
    font-weight: 700;
    font-size: 18px;
  }
}

.icon-container {
  margin-right: 8px;
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    height: auto;
  }
}

.ships-list {
  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  & h3 {
    min-width: 80px;
  }

  & li:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
