import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/home/Home";
import Start from "@/components/start/Start";
import Players from "@/components/players/Players";
import Setup from "@/components/setup/Setup";
import Game from "@/components/game/Game";
import Round from "@/components/round/Round";
import Ranking from "@/components/ranking/Ranking";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/new-game",
      name: "start",
      component: Start
    },
    {
      path: "/players",
      name: "players",
      component: Players
    },
    {
      path: "/setup",
      name: "setup",
      component: Setup
    },
    {
      path: "/game",
      name: "game",
      component: Game
    },
    {
      path: "/round/:numCards/:type",
      props: true,
      name: "round",
      component: Round
    },
    {
      path: "/ranking",
      name: "ranking",
      component: Ranking
    }
  ]
});
