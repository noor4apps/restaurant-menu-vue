<script setup>
defineProps({
  tree: {
    type: Object,
  }
})
</script>

<template>
  <div class="greetings">

    <ul>
      <li v-for="child in tree.children" :key="child.id">
        {{ child.name }}
        <Menus v-if="child.children.length > 0" :tree="child" />
      </li>
    </ul>

  </div>
</template>
