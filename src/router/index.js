import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home/Home';
import Players from '@/components/players/Players';
import Setup from '@/components/setup/Setup';
import Game from '@/components/game/Game';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ],
});
