<template>
  <div class="game">
    <router-link class="menu-option" to="/round/0/bet">Bet for new round</router-link>
    <router-link class="menu-option" to="/round/0/complete">Complete round</router-link>
    <ranking></ranking>
  </div>
</template>

<script>
export default {
  name: 'game',
  data() {
    return {
      rounds: [],
      currentRound: 0
    }
  }
}
</script>

<style scoped>

</style>
