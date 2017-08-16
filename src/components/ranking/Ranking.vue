<template>
    <div class="ranking">
        <h1>Current ranking</h1>
        <ul>
            <li v-for="player in ranking">{{player.name}}</li>
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
