<script setup>
import { storeToRefs } from 'pinia';

import { useItemsStore, useAlertStore } from '@/stores';

const itemsStore = useItemsStore();
const alertStore = useAlertStore();
const { items } = storeToRefs(itemsStore);

itemsStore.getAll();

async function onDelete(item_id) {
  try {
    let message;
    const res = await itemsStore.delete(item_id);
    message = res.data.message;
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
    <h1>Items</h1>
    <router-link to="/items/add" class="btn btn-sm btn-success mb-2">Add Item</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Name</th>
                <th style="width: 30%">Discount</th>
                <th style="width: 30%">Price</th>
                <th style="width: 30%">Menu</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length">
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td v-if="item.discount">{{ item.discount }}</td>
                    <td v-else> No Discount </td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.menu.name }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/items/edit/${item.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="onDelete(item.id)" class="btn btn-sm btn-danger btn-delete-item" :disabled="item.isDeleting">
                            <span v-if="item.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="items.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="items.error">
                <td colspan="4">
                    <div class="text-danger">Error loading items: {{items.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>
