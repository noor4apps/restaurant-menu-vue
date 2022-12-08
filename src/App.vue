<script setup>
import { Nav, Alert, HelloUser } from '@/components';
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
    <div class="app-container bg-light">
        <Nav />
        <hello-user v-if="user" :msg="user.name" />
        <Alert />
        <div class="container pt-4 pb-4">
            <router-view />
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
</style>