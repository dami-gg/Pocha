<template>
  <div class="page page--setup">
    <h1>Setup game</h1>
    <div class="option">
      <label for="dealer-dropdown">Choose the initial dealer:</label>
      <select id="dealer-dropdown" v-model="configuration.dealer">
        <option v-for="player in players" v-bind:key="player.id" v-bind:value="player">{{player.name}}</option>
      </select>
    </div>
    <div class="option">
      <input type="checkbox" id="one-card" v-model="configuration.allDealOneCard">
      <label for="one-card">Each players deals 1 card?</label>
    </div>
    <div class="option">
      <input type="checkbox" id="up-down" v-model="configuration.goingUpAndDown">
      <label for="up-down">Going up and down?</label>
    </div>
  
    <action-buttons :onConfirm="save" :onCancel="cancel" :confirmLabel="'Save changes'" :cancelLabel="'Cancel'" :confirmDisabled="!isGameSetup"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from '../common/ActionButtons';

export default {
  name: 'setup',
  components: {
    ActionButtons
  },
  data() {
    return {
      players: this.$store.state.players,
      configuration: {
        dealer: undefined,
        allDealOneCard: false,
        goingUpAndDown: true
      }
    }
  },
  methods: {
    save() {
      this.$store.commit('setupGame', this.configuration);
      this.redirectHome();
    },
    cancel() {
      this.redirectHome();
    },
    redirectHome() {
      this.$router.push('/');
    }
  },
  computed: {
    isGameSetup() {
      return !!this.configuration.dealer;
    }
  }
}
</script>

<style scoped>
.option {
  margin-bottom: 20px;
}
</style>
