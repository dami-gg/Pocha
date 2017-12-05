import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { calculateTotalRounds } from "../helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    players: [],
    playersAdded: false,
    setup: {},
    gameSetup: false,
    upAndDown: true,
    allDealOneCard: false,
    dealer: undefined,
    currentRound: 1,
    numCards: 1,
    totalRounds: 0,
    rounds: []
  },
  mutations: {
    addPlayer(state, player) {
      state.players.push(player);
    },

    removePlayer(state, playerRemoved) {
      // Vue only supports some array mutation methods so filter does not work (https://vuejs.org/v2/guide/list.html#Mutation-Methods)
      const playerIndex = state.players.findIndex(
        player => player.id === playerRemoved.id
      );

      if (playerIndex !== -1) {
        state.players = state.players.splice(playerIndex, 1);
      }
    },

    savePlayers(state) {
      const numPlayers = state.players.length;

      // TODO numPlayers should be between 3 and 6
      if (numPlayers) {
        state.playersAdded = true;
        state.totalRounds = calculateTotalRounds(numPlayers);
      }
    },

    clearPlayers(state) {
      state.playersAdded = false;
      state.players = [];
    },

    addRoundBets(state, round) {
      state.rounds.push(round);
    },

    addRoundScores(state, round) {
      let playerIndex;

      round.players.forEach(playerRound => {
        playerIndex = state.players.findIndex(
          player => player.id === playerRound.id
        );
        state.players[playerIndex].accumulatedScore =
          playerRound.accumulatedScore;
      });

      state.rounds.pop();
      state.rounds.push(round);
    },

    goToNextRound(state) {
      state.currentRound++;
      state.numCards++; // TODO Check going down or several first and last rounds
    },

    setupGame(state, configuration) {
      state.dealer = configuration.dealer;
      state.upAndDown = configuration.upAndDown;
      state.allDealOneCard = configuration.allDealOneCard;
      state.gameSetup = true;
    }
  }
});
