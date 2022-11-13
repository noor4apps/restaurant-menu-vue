<script setup>

import {useCategoriesStore} from "@/stores";
import Categories from "@/components/Categories.vue";
const categoryStore = useCategoriesStore();
categoryStore.getCategories();
</script>

<template>
    <div>
      <p>Frontend</p>
      <h1>Welcome!</h1>
      <Categories />
    </div>
</template>
