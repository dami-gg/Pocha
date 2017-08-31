<template>
  <div class="page page--players">
    <h1>{{ title }}</h1>
    <div class="new-player">
      <input class="new-player__input" id="playerForm" v-model="newPlayerName" placeholder="Player name">
      <button class="new-player__button" v-on:click="addPlayer($event)">Add player</button>
    </div>
    <h2>{{ subtitle }}</h2>
    <ul class="players">
      <li v-for="player in players" v-bind:key="player.id" class="players__player">
        <div class="players__player__name"><span>{{ player.name }}</span></div>
        <button v-on:click="removePlayer(player)" class="players__player__remove">-</button>
      </li>
    </ul>
    <action-buttons :onConfirm="savePlayers" :onCancel="clearPlayers" :confirmLabel="'Save players'" :cancelLabel="'Cancel changes'"></action-buttons>
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
      // TODO Take minimum number of players into consideration
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
.new-player {
  display: flex;
  width: 100%;
  height: 50px;
}

.new-player__input {
  width: 60%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.new-player__button {
  width: 40%;
  background-color: blue;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.players {
  display: flex;
  width: 100%;
  flex-direction: column;
  list-style: none;
}

.players__player {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
}

.players__player__name {
  width: 49%;
  margin-right: 1%;
  text-align: right;
  font-size: 18px;
}

.players__payer__remove {
  width: 49%;
  margin-left: 1%;
  cursor: pointer;
}
</style>
