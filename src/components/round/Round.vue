<template>
  <div class="round">
    <h1>Bets for round: {{number}}</h1>
    <div class="round__players">
      <div class="round__players__player" v-for="playerBet in this.roundBets" v-bind:key="playerBet.player.id">
        <div class="round__players__player__name">{{playerBet.player.name}}</div>
        <div class="round__players__player__bet">
          <input v-model="playerBet.bet" v-bind:class="{'readonly': type === ROUND_TYPE_SCORE}">
        </div>
        <div class="round__players__player__score" v-show="type === ROUND_TYPE_SCORE">
          <input v-model="playerBet.score">
        </div>
      </div>
    </div>
    <action-buttons :onConfirm="save" :onCancel="cancel" :confirmLabel="'Save'" :cancelLabel="'Cancel'"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';
import { ROUND_TYPE_BET, ROUND_TYPE_SCORE } from '../../constants';

export default {
  name: 'round',
  props: ['number', 'type'],
  components: {
    ActionButtons
  },
  data() {
    return {
      players: this.$store.state.players,
      rounds: this.$store.state.rounds,
      ROUND_TYPE_BET,
      ROUND_TYPE_SCORE
    }
  },
  methods: {
    save() {
      if (this.type === ROUND_TYPE_BET) {
        this.$store.commit('addRoundBets', this.roundBets);
      }
      else {
        this.$store.commit('addRoundScores', this.roundBets);
      }
      this.redirectToGame();
    },
    cancel() {
      this.redirectToGame();
    },
    redirectToGame() {
      this.$router.push('/game');
    }
  },
  computed: {
    // TODO Sort depending on who's the dealer
    roundBets() {
      let bets = [];

      this.players.forEach(player => {
        bets.push({ round: this.number, player, bet: undefined, score: undefined });
      });

      return bets;
    }
  }
}
</script>

<style scope>
.round__players__player {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px auto;
}
</style>