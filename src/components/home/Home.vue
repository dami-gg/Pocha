<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="players">
      <span class="menu-option__text">Add players</span>
    </router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded}" to="/setup">
      <span class="menu-option__text">Setup game</span>
    </router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded || !gameSetup}" to="/game">
      <span class="menu-option__text">Start game</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'Pocha',
      playersAdded: this.$store.state.playersAdded,
      gameSetup: this.$store.state.gameSetup
    };
  },
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
