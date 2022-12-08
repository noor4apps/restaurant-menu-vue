<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore, useAlertStore } from '@/stores';
import {router} from "@/router";

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email().required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 6 characters'),
    password_confirmation: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .min(8, 'password confirmation must be at least 6 characters')
});

async function onSubmit(values, {setErrors}) {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  await authStore.register(values).then(async () => {

    await authStore.updateState();

    // redirect to previous url or default to home page
    await router.push('/');

    alertStore.success('Registration successful');
  }).catch((err) => {
    if (err.response.data.errors) {
      setErrors(err.response.data.errors);
    } else {
      alertStore.error(err.response.data.message);
    }
  });
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header">Register</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <Field name="password_confirmation" type="password" class="form-control" :class="{ 'is-invalid': errors.password_confirmation }" />
                <div class="invalid-feedback">{{ errors.password_confirmation }}</div>
              </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Register
                    </button>
                    <router-link to="login" class="btn btn-link">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
