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
  </div>
</template>

<script>
export default {
  name: 'players',
  data() {
    return {
      title: 'Add new players',
      subtitle: 'Players:',
      players: [],
      newPlayerName: ''
    };
  },
  methods: {
    addPlayer() {
      this.players.push({ name: this.newPlayerName });
      this.newPlayerName = '';
    },
    removePlayer(deletedPlayer) {
      const playerIndex = this.players.findIndex(player => player.name === deletedPlayer.name);

      if (playerIndex !== -1) {
        this.players = this.players.splice(playerIndex, 1);
      }
    }
  }
};
</script>

<style scoped>
  .players-list {
    list-style: none;
  }
</style>
