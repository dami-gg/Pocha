<template>
  <div class="page page--ranking">
    <h1>Current ranking</h1>
    <table class="ranking">
      <tr class="ranking__row ranking__row--heading">
        <th>Round</th>
        <th v-for="player in players" v-bind:key="player.id" colspan="2">{{player.name}}</th>
      </tr>
      <tr class="ranking__row ranking__row--totals">
        <td>Total points</td>
        <td v-for="player in players" v-bind:key="player.id" colspan="2">{{player.accumulatedScore}}</td>
      </tr>
      <tr></tr>
      <tr class="ranking__row ranking__row--round" v-for="round in rounds" v-bind:key="round.id">
        <td>{{round.numCards}}</td>
        <td v-for="player in round.players" v-bind:key="player.id" colspan="2">
          <table>
            <tr>
              <td>
                <tr class="ranking__row__bet">
                  <td>{{player.bet}}</td>
                </tr>
                <tr class="ranking__row__score">
                  <td>{{player.score}}</td>
                </tr>
              </td>
              <td rowspan="2">{{player.accumulatedScore}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <action-buttons :onCancel="redirectToGame" :cancelLabel="'Back to game'"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';

export default {
  name: 'ranking',
  components: {
    ActionButtons
  },
  data() {
    return {
      rounds: this.$store.state.rounds.reverse(),
      players: this.$store.state.players
    }
  },
  methods: {
    redirectToGame() {
      this.$router.push('/game');
    }
  }
}
</script>

<style scoped>
.ranking {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.ranking__row {
  border-bottom: 1px solid black;
}

.ranking__row--heading {
  font-size: 1.8rem;
  text-transform: uppercase;
}

.ranking__row td:not(:first-child) {
  border-left: 1px solid black;
}

.ranking__row__bet {
  border-bottom: 1px solid black;
}
</style>
