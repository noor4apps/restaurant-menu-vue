<script setup>
import { storeToRefs } from 'pinia';

import {useAlertStore, useUsersStore} from '@/stores';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();

async function onDelete(user_id) {
  await usersStore.delete(user_id).then((res) => {
    // remove user from list after deleted
    this.users = this.users.filter(x => x.id !== user_id);
    alertStore.success(res.data.message);
  }).catch((err) => {
    // remove isDeletes if the deletion fails
    this.users.find(x => x.id === user_id).isDeleting = false;
    alertStore.error(err.response.data.message);
  });
}
</script>

<template>
    <h1>Users</h1>
    <router-link to="/users/add" class="btn btn-sm btn-success mb-2">Add User</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Name</th>
                <th style="width: 30%">Email</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users.length">
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="onDelete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isDeleting">
                            <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="users.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="users.error">
                <td colspan="4">
                    <div class="text-danger">Error loading users: {{users.error.response.data.message}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>
