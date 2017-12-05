<template>
  <div class="page page--game">
    <h1>Current round: {{this.currentRound}} {{this.currentRound === 1 ? 'card is' : 'cards are'}} dealt</h1>
    <div class="menu">
      <menu-option :path="'round'" :params="{numCards: this.currentRound, type: ROUND_TYPE_BET}" :label="'Add bets'" :class="{'disabled': isRoundBet}"></menu-option>
      <menu-option :path="'round'" :params="{numCards: this.currentRound, type: ROUND_TYPE_SCORE}" :label="'Add scores'" :class="{'disabled': !isRoundBet}"></menu-option>
      <menu-option :path="'ranking'" :label="'See current ranking'"></menu-option>
    </div>
    <action-buttons :onConfirm="goToNextRound" :onCancel="abort" :confirmLabel="'Play next round'" :cancelLabel="'Abort game'" :confirmDisabled="!isRoundComplete"></action-buttons>
  </div>
</template>

<script>
import MenuOption from '../common/MenuOption';
import ActionButtons from '../common/ActionButtons';
import { ROUND_TYPE_BET, ROUND_TYPE_SCORE } from '../../constants';

export default {
  name: 'game',
  components: {
    MenuOption,
    ActionButtons
  },
  data() {
    return {
      rounds: this.$store.state.rounds,
      currentRound: this.$store.state.currentRound,
      ROUND_TYPE_BET,
      ROUND_TYPE_SCORE
    }
  },
  methods: {
    goToNextRound() {
      this.$store.commit('goToNextRound');
      location.reload(); // TODO Find a seamless way to do this without reloading
    },
    abort() {
      this.$router.push('/');
      // TODO Reset state
    }
  },
  computed: {
    isRoundBet() {
      return this.rounds.find(round => round.id === this.currentRound && round.players.length);
    },
    isRoundComplete() {
      return this.rounds.find(round => round.id === this.currentRound && round.players.length && !!round.players[0].score);
    }
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
