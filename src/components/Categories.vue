<script setup>
import { storeToRefs } from 'pinia';

import { useCategoriesStore } from '@/stores';
import Menus from "@/components/Menus.vue";

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

</script>

<template>
    <div class="bg-white">

      <ul v-if="categories.length > 0">
            <li  v-for="category in categories" :key="category.id" >
              <div>
                {{ category.name }}
              </div>

              <Menus :tree="category" />
            </li>
      </ul>

    </div>
</template>