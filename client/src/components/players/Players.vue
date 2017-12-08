<template>
  <div class="page page--players">
    <h1>{{ title }}</h1>
    
    <div class="row">
      <p class="row__description">Select an existing player</p>
      <select class="row__input" v-model="selectedPlayer">
        <option v-for="player in allPlayers" class="row__input__option"
          v-bind:key="player.id" v-bind:value="player">{{player.name}}</option>
      </select>
      <button class="row__button n" v-on:click="selectPlayer($event)">Select</button>
    </div>
    
    <div class="row new-player">
      <p class="row__description">Create a new player</p>
      <input class="row__input" id="playerForm" v-model="newPlayerName" placeholder="Player name">
      <button class="row__button" v-on:click="addNewPlayer($event)">Add new player</button>
    </div>
    
    <h2>{{ subtitle }}</h2>
    <ul class="players">
      <li v-for="player in players" v-bind:key="player.id" class="players__player">
        <div class="players__player__name"><span>{{ player.name }}</span></div>
        <button v-on:click="removePlayer(player)" class="players__player__remove">X</button>
      </li>
    </ul>
    <action-buttons :onConfirm="savePlayers" :onCancel="clearPlayers" :confirmLabel="'Save players'" :cancelLabel="'Cancel changes'"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from "../common/ActionButtons";
import {
  ALL_PLAYERS_QUERY,
  CREATE_PLAYER
} from "../../constants/graphql";

export default {
  name: "players",
  components: {
    ActionButtons
  },
  data() {
    return {
      title: "Add new players",
      subtitle: "Players:",
      players: this.$store.state.players,
      newPlayerName: "",
      selectedPlayer: "",
      allPlayers: []
    };
  },
  methods: {
    addNewPlayer(event) {
      event.preventDefault();

      this.$apollo
        .mutate({
          mutation: CREATE_PLAYER,
          variables: {
            name: this.newPlayerName
          }
        })
        .then(response => {
          const newPlayer = {
            id: response.data.createPlayer.id,
            name: response.data.createPlayer.name
          };

          this.$store.commit("addPlayer", newPlayer);
        });

      this.newPlayerName = "";
    },
    selectPlayer(event) {
      event.preventDefault();
      this.$store.commit("addPlayer", this.selectedPlayer);
      this.selectedPlayer = undefined;
    },
    removePlayer(deletedPlayer) {
      this.$store.commit("removePlayer", deletedPlayer);
    },
    savePlayers() {
      // TODO Take minimum number of players into consideration
      this.$store.commit("savePlayers");
      this.redirectHome();
    },
    clearPlayers() {
      this.$store.commit("clearPlayers");
      this.redirectHome();
    },
    redirectHome() {
      this.$router.push("/new-game");
    }
  },
  apollo: {
    allPlayers: {
      query: ALL_PLAYERS_QUERY
    }
  }
};
</script>

<style scoped>
.row {
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}

.row__description {
  width: 20%;
}

.row__input {
  width: 38%;
  margin-right: 2%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.row__button {
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

.players__player__remove {
  width: 2%;
  margin-left: 1%;
  cursor: pointer;
  background-color: red;
  color: white;
  font-weight: bold;
}
</style>
