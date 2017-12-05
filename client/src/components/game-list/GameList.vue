<template>
  <div class="game-list">
    <h4 v-if="loading">Loading previous games...</h4>
    <div v-if="!loading">
        <h3>Previous games:</h3>
        <ul class="game-list__list">
            <li class="game-list__list__item" v-for="game in allGames" :key="game.id">
                <a>{{game.id}} {{game.createdAt}}</a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { ALL_GAMES_QUERY } from "../../constants/graphql";

export default {
  name: "GameList",
  data() {
    return {
      allGames: [],
      loading: 0
    };
  },
  apollo: {
    allGames: {
      query: ALL_GAMES_QUERY
    }
  }
};
</script>

<style scoped>
.game-list__list {
  list-style: none;
  width: 90%;
  margin: 10px auto;
  padding: 0;
}

.game-list__list__item {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: darkorange;
  color: white;
  border: 1px solid black;
  height: 3rem;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
}
</style>