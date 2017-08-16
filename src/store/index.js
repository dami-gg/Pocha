import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    playersAdded: false,
    setup: {},
    gameSetup: true, // TODO
    upAndDown: true, // TODO
    eachPlayerDealsFirstRound: true, // TODO
    dealer: undefined,
    currentRound: 0,
    totalRounds: undefined,
    rounds: {}
  },
  mutations: {
    addPlayer(state, playerName) {
      state.players.push({id: state.players.length, name: playerName});
    },
    removePlayer(state, playerRemoved) {
      // Vue only supports some array mutation methods so filter does not work (https://vuejs.org/v2/guide/list.html#Mutation-Methods)
      const playerIndex = state.players.findIndex(player => player.name === playerRemoved.name);

      if (playerIndex !== -1) {
        state.players = state.players.splice(playerIndex, 1);
      }
    },
    savePlayers(state) {
      state.playersAdded = true;
    },
    clearPlayers(state) {
      state.playersAdded = false;
      state.players = [];
    },
    addRoundBets(state, roundBets) {
      state.rounds.push(roundBets);
    }
  }
});
