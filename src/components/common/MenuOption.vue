<template>
  <router-link class="menu-option" :to="routeDestination">
    {{label}}
  </router-link>
</template>

<script>
export default {
  name: 'menu-option',
  props: {
    path: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    routeDestination() {
      return {
        name: this.path,
        params: this.params || {}
      };
    }
  }
}
</script>

<style scoped>
.menu-option {
  margin: 10px auto;
  background-color: blue;
  color: white;
  font-weight: 600;
  border: 1px solid black;
  height: 20px;
  padding: 10px;
  text-decoration: none;
}

.menu-option.disabled {
  background-color: grey;
  pointer-events: none;
}

@media(min-width: 768px) {
  .menu-option {
    margin: 10px 40%;
  }
}
</style>
