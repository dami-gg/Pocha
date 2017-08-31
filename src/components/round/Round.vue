<template>
  <div class="round">
    <h1>{{type === ROUND_TYPE_BET ? 'Bets' : 'Scores'}} for round of {{round.numCards}} cards dealt by {{this.dealer.name}}</h1>
    <div class="round__players">
      <div class="round__players__player" v-for="player in this.round.players" v-bind:key="player.id">
        <div class="round__players__name">{{player.name}}</div>
        <div class="round__players__inputs">
          <div class="round__players__bet">
            <label v-bind:for="'bet' + player.id">Bet:</label>
            <input v-bind:id="'bet' + player.id" v-model="player.bet" v-bind:disabled="type === ROUND_TYPE_SCORE">
          </div>
          <div class="round__players__score">
            <label v-bind:for="'score__' + player.id">Score:</label>
            <input v-bind:id="'score__' + player.id" v-model="player.points" v-bind:disabled="type === ROUND_TYPE_BET">
          </div>
        </div>
      </div>
    </div>
    <action-buttons :onConfirm="save" :onCancel="cancel" :confirmLabel="'Save'" :cancelLabel="'Cancel'"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';
import { ROUND_TYPE_BET, ROUND_TYPE_SCORE } from '../../constants';
import { calculateScore } from '../../helpers';

export default {
  name: 'round',
  props: ['numCards', 'type'],
  components: {
    ActionButtons
  },
  data() {
    return {
      players: this.$store.state.players,
      rounds: this.$store.state.rounds,
      dealer: this.$store.state.dealer,
      currentRound: this.$store.state.currentRound,
      ROUND_TYPE_BET,
      ROUND_TYPE_SCORE
    }
  },
  methods: {
    // TODO Validate form and disable button while requirement are not met (see isEverythingCorrect method below)    
    save() {
      if (this.type === ROUND_TYPE_BET) {
        this.$store.commit('addRoundBets', this.round);
      }
      else {
        this.round.players.forEach(player => {
          let score = calculateScore(player.bet, player.points);
          player.score = score;
          player.accumulatedScore += score;
        });

        this.$store.commit('addRoundScores', this.round);
      }
      this.redirectToGame();
    },

    cancel() {
      this.redirectToGame();
    },

    redirectToGame() {
      this.$router.push('/game');
    },

    initializeRound() {
      let round = {
        id: this.currentRound,
        numCards: this.numCards,
        players: [],
        dealer: this.dealer
      };

      this.addPlayersSortedToRound(round);

      return round;
    },

    getRound() {
      let totalRounds = this.rounds.length;

      return this.rounds[totalRounds - 1];
    },

    addPlayersSortedToRound(round) {
      // Sort players depending on who's the dealer, being this the last one
      const dealerIndex = this.players.findIndex(player => this.dealer.id === player.id);
      const totalPlayers = this.players.length;

      for (let i = dealerIndex + 1; i < totalPlayers; i++) {
        this.addPlayerToRound(round, this.players[i]);
      }

      for (let i = 0; i <= dealerIndex; i++) {
        this.addPlayerToRound(round, this.players[i]);
      }
    },

    addPlayerToRound(round, player) {
      round.players.push({
        id: player.id,
        name: player.name,
        bet: undefined,
        points: undefined,
        score: undefined,
        accumulatedScore: player.accumulatedScore
      })
    },

    isEverythingCorrect() {
      return this.type === ROUND_TYPE_BET
        ? this.areAllValuesAdded('bet') && this.areBetsDifferentThanTotalCards()
        : this.areAllValuesAdded('score');
    },

    areAllValuesAdded(valueType) {
      if (!this.round || !this.round.players || !this.round.players.length) {
        return false;
      }

      let allAdded = true;
      this.round.players.forEach(player => allAdded = allAdded && !!player[valueType]);

      return allAdded;
    },

    areBetsDifferentThanTotalCards() {
      // The addition of all players' bets cannot be equal to the total of cards played in the round.
      // If that happens, the dealer will have to change his bet.
      if (this.type === ROUND_TYPE_SCORE) {
        return true;
      }

      let totalBets = 0;

      this.round.players.forEach(player => {
        totalBets += player.bet;
      });

      return totalBets !== this.numCards;
    }
  },
  computed: {
    round() {
      return this.type === ROUND_TYPE_BET ? this.initializeRound() : this.getRound();
    }
  },
}
</script>

<style scope>
.round__players__player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
}

.round__players__name {
  margin: 10px auto;
  font-size: 1.4rem;
}

.round__players__inputs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
  padding: 0 40%;
}

.round__players__inputs input {
  height: 2rem;
  width: 3rem;
  text-align: center;
  font-size: 1.2rem;
}

.round__players__inputs input:disabled {
  background-color: lightgrey;
  border: none;
}
</style>