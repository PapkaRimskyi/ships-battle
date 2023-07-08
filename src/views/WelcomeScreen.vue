<template>
  <section class="menu-container">
    <ul>
      <li class="menu-item">
        <router-link to="game" custom v-slot="{ navigate }">
          <button @click="navigate" role="link" class="menu-button" type="button">Начать игру</button>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.menu-container {
  padding: 4rem;
  border: 2px solid #000;
  border-radius: 8px;
}

.menu-item:not(:last-child) {
  margin-bottom: 16px;
}

.menu-button {
  padding: 1rem;
  width: 100%;
  font-size: 2.5rem;
  background-color: rgba(48, 162, 229, .6);
  transition: background-color .2s ease-in;
  border-radius: 8px;
}

.menu-button:hover,
.menu-button:focus-within {
  background-color: rgba(48, 162, 229, 1);
}

.menu-button:active {
  background-color: rgba(48, 162, 229, .4);
}
</style>
