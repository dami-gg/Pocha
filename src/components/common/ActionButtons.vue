<template>
  <div class="action-buttons">
    <button class="action-button action-button--confirm" v-on:click="onConfirm" :class="{'disabled': confirmDisabled}">{{confirmLabel}}</button>
    <button class="action-button action-button--cancel" v-on:click="onCancel" :class="{'disabled': cancelDisabled}">{{cancelLabel}}</button>
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
    },
    confirmDisabled: {
      type: Boolean,
      required: false
    },
    cancelDisabled: {
      type: Boolean,
      required: false
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
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
  font-weight: 600;
  border: 1px solid black;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.action-button--confirm {
  background-color: green;
}

.action-button--cancel {
  background-color: red;
}

.action-button.disabled {
  background-color: grey;
  pointer-events: none;
}
</style>
