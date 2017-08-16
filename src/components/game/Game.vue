<template>
  <div class="game">
    <h1>Current round: {{this.currentRound}}</h1>
    <div class="menu">
      <menu-option :path="'bets'" :params="{round: this.currentRound}" :label="'Add bets'"></menu-option>
      <menu-option :path="'scores'" :params="{round: this.currentRound}" :label="'Add scores'"></menu-option>
    </div>
  </div>
</template>

<script>
import MenuOption from '../common/MenuOption';

export default {
  name: 'game',
  components: {
    MenuOption
  },
  data() {
    return {
      rounds: [],
      currentRound: this.$store.state.currentRound
    }
  }
}
</script>

<style scoped>

.menu {
  display: flex;
  flex-direction: column;
}

</style>
