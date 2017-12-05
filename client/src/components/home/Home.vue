<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="/new-game">
      <span class="menu-option__text">New game</span>
    </router-link>
    <game-list></game-list>
  </div>
</template>

<script>
import GameList from "../game-list/GameList";

export default {
  name: "home",
  components: {
    GameList
  },
  data() {
    return {
      title: "Pocha"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.menu-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 10px auto;
  background-color: blue;
  color: white;
  border: 1px solid black;
  height: 15rem;
  padding: 10px;
  text-decoration: none;
}

.menu-option.disabled {
  background-color: grey;
  pointer-events: none;
}

.menu-option__text {
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
