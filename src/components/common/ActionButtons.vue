<template>
  <div class="action-buttons">
    <button class="action-button action-button--confirm" v-on:click="onConfirm">{{confirmLabel}}</button>
    <button class="action-button action-button--cancel" v-on:click="onCancel">{{cancelLabel}}</button>
  </div>
</template>

<script>
export default {
  name: 'action-buttons',
  props: {
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    },
    confirmLabel: {
      type: String,
      required: true
    },
    cancelLabel: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;  
}

.action-button {
  margin: 10px auto;  
  color: white;
  font-weight: 600;
  border: 1px solid black;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

@media(min-width: 768px) {
  .action-button {
    margin: 10px 40%;
  }
}

.action-button--confirm {
  background-color: green;
}

.action-button--cancel {
  background-color: red;
}
</style>
