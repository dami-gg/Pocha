<template>
  <div class="start">
    <h1>{{ title }}</h1>
    <router-link class="menu-option" to="players">
      <span class="menu-option__text">Add players</span>
    </router-link>
    <router-link class="menu-option" v-bind:class="{'disabled': !playersAdded}" to="/setup">
      <span class="menu-option__text">Setup game</span>
    </router-link>
    <button class="menu-option" 
        v-bind:class="{'disabled': !playersAdded || !gameSetup}" 
        v-on:click="createNewGame()">
      <span class="menu-option__text">Start game</span>
    </button>
    <router-link class="menu-option negative" to="/">
      <span class="menu-option__text">Back to home</span>
    </router-link>
  </div>
</template>

<script>
import {
  CREATE_GAME,
  CREATE_GAME_CONFIGURATION,
  ADD_PLAYER_TO_GAME,
  CREATE_ROUND
} from "../../constants/graphql";

export default {
  name: "start",
  data() {
    return {
      title: "New game",
      playersAdded: this.$store.state.playersAdded,
      players: this.$store.state.players,
      gameSetup: this.$store.state.gameSetup,
      dealer: this.$store.state.dealer,
      upAndDown: this.$store.state.upAndDown,
      allDealOneCard: this.$store.state.allDealOneCard
    };
  },
  methods: {
    createNewGame() {
      this.$apollo
        .mutate({
          mutation: CREATE_GAME
        })
        .then(response => {
          const game = response.data.createGame;
          this.$store.commit("setCurrentGame", game);

          const gameId = game.id;

          this.addPlayersToGame(gameId);

          this.createGameConfiguration(gameId);

          this.createInitialRound(gameId);
        });
    },
    addPlayersToGame(gameId) {
      this.players.forEach(player => {
        this.$apollo.mutate({
          mutation: ADD_PLAYER_TO_GAME,
          variables: {
            gameId,
            playerId: player.id
          }
        });
      });
    },
    createGameConfiguration(gameId) {
      this.$apollo.mutate({
        mutation: CREATE_GAME_CONFIGURATION,
        variables: {
          gameId,
          initialDealerId: this.dealer.id,
          allDealOneCard: this.allDealOneCard,
          upAndDown: this.goingUpAndDown
        }
      });
    },
    createInitialRound(gameId) {
      this.$apollo
        .mutate({
          mutation: CREATE_ROUND,
          variables: {
            gameId
          }
        })
        .then(response => {
          const nextRound = {
            id: response.data.createRound.id,
            numCards: response.data.createRound.numCards
          };

          this.$store.commit("goToNextRound", nextRound);
          // Routing has to be handled this way using a button since a router-link
          // would not wait for the callback and the context won't be ready
          this.$router.push("/game");
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
