<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useMenusStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const menusStore = useMenusStore();
const alertStore = useAlertStore();
const { menus } = storeToRefs(menusStore);

const route = useRoute();
const id = route.params.id;

let title = 'Add Menu';
let menu = null;
if (id) {
    // edit mode
    title = 'Edit Menu';
    ({ menu } = storeToRefs(menusStore));
    menusStore.getById(id);
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    discount: Yup.number().nullable(true).transform(v => v === '' ? v : null).positive('Discount is number positive'),
    type: Yup.string().required('Type is required'),
});

menusStore.create();

async function onSubmit(values) {
    try {
        let message;
        if (menu) {
            const res = await menusStore.update(menu.value.id, values)
            message = res.data.message;
        } else {
            const res = await menusStore.add(values);
            message = res.data.message;
        }
        await router.push('/menus');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(menu?.loading || menu?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="menu" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="form-group col">
                    <label>Discount</label>
                    <Field name="discount" type="text" class="form-control" :class="{ 'is-invalid': errors.discount }" />
                    <div class="invalid-feedback">{{ errors.discount }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Type</label>
                    <Field name="type" as="select" class="form-control" :class="{ 'is-invalid': errors.type }">
                      <option value="">Select a Type</option>
                      <option value="category">Category</option>
                      <option value="item">Item</option>
                    </Field>
                    <div class="invalid-feedback">{{ errors.type }}</div>
                </div>
                <div class="form-group col">
                <label>Parent Menu</label>
                <Field name="menu_id" as="select" class="form-control"  :class="{ 'is-invalid': errors.menu_id }">
                  <option value="">Select a Menu</option>
                  <option :value="menu.id" v-for="menu in menus" :key="menu.id" >{{ menu.name }}</option>
                </Field>
                <div class="invalid-feedback">{{ errors.menu_id }}</div>
              </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/menus" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="menu?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="menu?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading menu: {{menu.error}}</div>
        </div>
    </template>
</template>
