<template>
  <div class="players">
    <h1>{{ title }}</h1>
    <form>
      <input id="playerForm" v-model="newPlayerName" placeholder="Player name">
      <button v-on:click="addPlayer($event)">Add player</button>
    </form>
    <h3>{{ subtitle }}</h3>
    <ul class="players-list">
      <li v-for="player in players" v-bind:key="player.id">
        {{ player.name }}
        <button v-on:click="removePlayer(player)">-</button>
      </li>
    </ul>
    <action-buttons :onConfirm="savePlayers" :onCancel="clearPlayers" :confirmLabel="'Save players'" :cancelLabel="'Cancel changes'">
    </action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';

export default {
  name: 'players',
  components: {
    ActionButtons
  },
  data() {
    return {
      title: 'Add new players',
      subtitle: 'Players:',
      players: this.$store.state.players,
      newPlayerName: ''
    };
  },
  methods: {
    addPlayer(event) {
      event.preventDefault();
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
