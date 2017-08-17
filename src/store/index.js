import Vue from "vue";
import Vuex from "vuex";

import { calculateTotalRounds } from "../helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    playersAdded: false,
    setup: {},
    gameSetup: false, 
    upAndDown: true,
    allDealOneCard: false, 
    dealer: undefined,
    currentRound: 1,
    totalRounds: 0,
    rounds: []
  },
  mutations: {
    addPlayer(state, playerName) {
      state.players.push({ id: state.players.length, name: playerName });
    },
    removePlayer(state, playerRemoved) {
      // Vue only supports some array mutation methods so filter does not work (https://vuejs.org/v2/guide/list.html#Mutation-Methods)
      const playerIndex = state.players.findIndex(
        player => player.name === playerRemoved.name
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
      state.rounds.pop();
      state.rounds.push(round);
    },
    goToNextRound(state) {
      state.currentRound++; // TODO Check going down or several first and last rounds
    },
    setupGame(state, configuration) {
      state.dealer = configuration.dealer;
      state.upAndDown = configuration.upAndDown;
      state.allDealOneCard = configuration.allDealOneCard;
      state.gameSetup = true;
    }
  }
});
