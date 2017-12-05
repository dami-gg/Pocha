<template>
  <div class="start">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="players">
      <span class="menu-option__text">Add players</span>
    </router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded}" to="/setup">
      <span class="menu-option__text">Setup game</span>
    </router-link>
    <router-link class="menu-option" 
        v-bind:class="{'disabled': !playersAdded || !gameSetup}" 
        to="/game" 
        v-on:click.native="createNewGame()">
      <span class="menu-option__text">Start game</span>
    </router-link>
    <router-link class="menu-option negative" to="/">
      <span class="menu-option__text">Back to home</span>
    </router-link>
  </div>
</template>

<script>
import {
  CREATE_GAME_MUTATION,
  CREATE_GAME_CONFIGURATION_MUTATION,
  ADD_PLAYER_TO_GAME
} from "../../constants/graphql";

export default {
  name: "start",
  data() {
    return {
      title: "New game",
      playersAdded: this.$store.state.playersAdded,
      players: this.$store.state.players,
      gameSetup: this.$store.state.gameSetup
    };
  },
  methods: {
    createNewGame() {
      this.$apollo
        .mutate({
          mutation: CREATE_GAME_MUTATION
        })
        .then(response => {
          const gameId = response.data.createGame.id;
          
          this.players.forEach(player => {
            this.$apollo.mutate({
              mutation: ADD_PLAYER_TO_GAME,
              variables: {
                gameId,
                playerId: player.id
              }
            });
          });

          this.$apollo.mutate({
            mutation: CREATE_GAME_CONFIGURATION_MUTATION,
            variables: {
              initialDealer: this.gameSetup.initialDealer,
              allDealOneCard: this.gameSetup.allDealOneCard,
              upAndDown: this.gameSetup.goingUpAndDown
            }
          });
        });
    }
  }
};
</script>

<style scoped>
.start {
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

.menu-option.negative {
  background-color: red;
}

.menu-option__text {
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
