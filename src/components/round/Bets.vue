<template>
  <div class="round">
    <div class="players">
      <div class="player" v-for="playerBet in this.roundBets" v-bind:key="playerBet.player.id">
        <div>{{playerBet.player.name}}</div>
        <input v-model="playerBet.bet">
      </div>
    </div>
    <action-buttons :onConfirm="save" :onCancel="cancel" :confirmLabel="'Save bets'" :cancelLabel="'Cancel'">
    </action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';

export default {
  name: 'bets',
  props: ['round'],
  components: {
    ActionButtons
  },
  data() {
    return {
      players: this.$store.state.players,
      rounds: this.$store.state.rounds
    }
  },
  methods: {
    save() {
      this.$store.commit('addRoundBets', this.roundBets);
    },
    cancel() {
      this.$router.push('/game');
    }
  },
  computed: {
    // TODO Sort depending on who's the dealer
    roundBets() {
      let bets = [];

      this.players.forEach(player => {
        bets.push({ round: this.round, player, bet: undefined });
      });

      return bets;
    }
  }
}
</script>

<style scope>

</style>