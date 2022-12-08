<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
    <h6 class="green text-right p-2">
      <span class="badge bg-secondary text-light text-capitalize">hello: {{ msg }}</span>
    </h6>
</template>
