<script setup>
import { storeToRefs } from 'pinia';

import { useMenusStore, useAlertStore } from '@/stores';

const menusStore = useMenusStore();
const alertStore = useAlertStore();
const { menus } = storeToRefs(menusStore);

menusStore.getAll();

async function onDelete(menu_id) {
  try {
    let message;
    const res = await menusStore.delete(menu_id);
    message = res.data.message;
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
    <h1>Menus</h1>
    <router-link to="/menus/add" class="btn btn-sm btn-success mb-2">Add Menu</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Name</th>
                <th style="width: 20%">Discount</th>
                <th style="width: 30%">Type</th>
                <th style="width: 30%">Parent Menu</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="menus.length">
                <tr v-for="menu in menus" :key="menu.id">
                    <td>{{ menu.name }}</td>
                    <td v-if="menu.discount">{{ menu.discount }}</td>
                    <td v-else> No Discount </td>
                    <td>{{ menu.type }}</td>
                    <td v-if="menu.menu">{{ menu.menu.name }}</td>
                    <td v-else> No Parent </td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/menus/edit/${menu.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="onDelete(menu.id)" class="btn btn-sm btn-danger btn-delete-menu" :disabled="menu.isDeleting">
                            <span v-if="menu.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="menus.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="menus.error">
                <td colspan="4">
                    <div class="text-danger">Error loading menus: {{menus.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>
