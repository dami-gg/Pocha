<template>
  <div class="players">
    <h1>{{ title }}</h1>
    <form>
      <input id="playerForm" v-model="newPlayerName" placeholder="Player name">
      <button v-on:click="addPlayer">Add player</button>
    </form>
    <h3>{{ subtitle }}</h3>
    <ul class="players-list">
      <li v-for="player in players" v-bind:key="player.id">
        {{ player.name }}
        <button v-on:click="removePlayer(player)">-</button>
      </li>
    </ul>
    <button v-on:click="savePlayers()">Save players</button>
    <button v-on:click="clearPlayers()">Cancel changes</button>
  </div>
</template>

<script>
export default {
  name: 'players',
  data() {
    return {
      title: 'Add new players',
      subtitle: 'Players:',
      players: this.$store.state.players,
      newPlayerName: ''
    };
  },
  methods: {
    addPlayer() {
      this.$store.commit('addPlayer', this.newPlayerName);
      this.newPlayerName = '';
    },
    removePlayer(deletedPlayer) {
      this.$store.commit('removePlayer', deletedPlayer);
    },
    savePlayers() {
      this.$store.commit('savePlayers');
      this.redirectHome();
    },
    clearPlayers() {
      this.$store.commit('clearPlayers');
      this.redirectHome();
    },
    redirectHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.players-list {
  list-style: none;
}
</style>
