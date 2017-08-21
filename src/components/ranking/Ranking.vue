<template>
    <div class="page page--ranking">
        <h1>Current ranking</h1>
        <ul>
            <li v-for="player in ranking" v-bind:key="player.id">{{player.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ranking',
    data() {
        return {
            ranking: []
        }
    }
}
</script>

<style scoped>

</style>
