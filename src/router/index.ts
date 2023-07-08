import { createRouter, createWebHistory } from 'vue-router';

import WelcomeScreen from "@/views/WelcomeScreen.vue";
import Game from "@/views/game/Game.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeScreen
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
  ]
})

export default router
