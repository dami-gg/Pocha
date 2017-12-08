<template>
  <div class="page page--game">
    <h1>Current round: {{this.currentRound && this.currentRound.numCards}} {{this.currentRound && this.currentRound.numCards === 1 ? 'card is' : 'cards are'}} dealt</h1>
    <div class="menu">
      <menu-option :path="'round'" :params="{type: ROUND_TYPE_BET}" :label="'Add bets'" :class="{'disabled': isRoundBet}"></menu-option>
      <menu-option :path="'round'" :params="{type: ROUND_TYPE_SCORE}" :label="'Add scores'" :class="{'disabled': !isRoundBet}"></menu-option>
      <menu-option :path="'ranking'" :label="'See current ranking'"></menu-option>
    </div>
    <action-buttons :onConfirm="goToNextRound" :onCancel="abort" :confirmLabel="'Play next round'" :cancelLabel="'Abort game'" :confirmDisabled="!isRoundComplete"></action-buttons>
  </div>
</template>

<script>
import MenuOption from "../common/MenuOption";
import ActionButtons from "../common/ActionButtons";
import { ROUND_TYPE_BET, ROUND_TYPE_SCORE } from "../../constants";
import { CREATE_ROUND } from "../../constants/graphql";

export default {
  name: "game",
  components: {
    MenuOption,
    ActionButtons
  },
  data() {
    return {
      currentGame: this.$store.state.currentGame,
      rounds: this.$store.state.rounds,
      currentRound: this.$store.state.currentRound,
      ROUND_TYPE_BET,
      ROUND_TYPE_SCORE
    };
  },
  methods: {
    goToNextRound() {
      this.$apollo
        .mutate({
          mutation: CREATE_ROUND,
          variables: {
            gameId: this.currentGame && this.currentGame.id
          }
        })
        .then(response => {
          const nextRound = {
            id: response.data.createRound.id,
            numCards: response.data.createRound.numCards
          };

          this.$store.commit("goToNextRound", nextRound);
          location.reload(); // TODO Find a seamless way to do this without reloading
        });
    },
    abort() {
      this.$router.push("/");
      // TODO Reset state
    }
  },
  computed: {
    isRoundBet() {
      return this.rounds.find(
        round => round.id === this.currentRound.id && round.players.length
      );
    },
    isRoundComplete() {
      return this.rounds.find(
        round =>
          round.id === this.currentRound.id &&
          round.players.length &&
          !!round.players[0].score
      );
    }
  }
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
