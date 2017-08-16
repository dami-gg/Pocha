<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="players">Add players</router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded}" to="/setup">Setup game</router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded || !gameSetup}" to="/game">Start game</router-link>
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
  margin: 10px auto;
  background-color: blue;
  color: white;
  font-weight: 600;
  border: 1px solid black;
  height: 20px;
  padding: 10px;
  text-decoration: none;
}

.menu-option.disabled {
  background-color: grey;
  pointer-events: none;
}

@media(min-width: 768px) {
  .menu-option {
    margin: 10px 40%;
  }
}
</style>
