<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
        </div>
        <div class="navbar-nav ml-auto" v-if="!authStore.user">
          <router-link to="/account/login" class="nav-item nav-link mr-auto">Login</router-link>
          <router-link to="/account/register" class="nav-item nav-link">Register</router-link>
        </div>
        <div class="navbar-nav" v-if="authStore.user">
            <router-link to="/users" class="nav-item nav-link">Users</router-link>
            <router-link to="/items" class="nav-item nav-link">Items</router-link>
            <router-link to="/menus" class="nav-item nav-link">Menus</router-link>
        </div>
        <button v-if="authStore.user" @click="authStore.logout()" class="btn btn-outline-success ml-auto">Logout</button>
    </nav>
</template>