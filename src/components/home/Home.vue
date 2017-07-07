<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="/players">Start a new game</router-link>
    <router-link class="menu-option" to="/setup">Setup game</router-link>
    <router-link class="menu-option" to="/game">Start game</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'Pocha',
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

@media(min-width: 768px) {
  .menu-option {
    margin: 10px 40%;
  }
}
</style>
