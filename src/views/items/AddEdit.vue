<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useItemsStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const itemsStore = useItemsStore();
const alertStore = useAlertStore();
const { items } = storeToRefs(itemsStore);

const route = useRoute();
const id = route.params.id;

let title = 'Add Item';
let item = null;
if (id) {
    // edit mode
    title = 'Edit Item';
    ({ item } = storeToRefs(itemsStore));
    itemsStore.getById(id);
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    discount: Yup.number().positive('Discount is number positive'),
    price: Yup.string().required('Price is required'),
    menu_id: Yup.string().required('Menu is required'),
});

itemsStore.create();

async function onSubmit(values) {
    try {
        let message;
        if (item) {
            const res = await itemsStore.update(item.value.id, values)
            message = res.data.message;
        } else {
            const res = await itemsStore.add(values);
            message = res.data.message;
        }
        await router.push('/items');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(item?.loading || item?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="item" v-slot="{ errors, isSubmitting }">
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
                    <label>Price</label>
                    <Field name="price" type="text" class="form-control" :class="{ 'is-invalid': errors.price }" />
                    <div class="invalid-feedback">{{ errors.price }}</div>
                </div>
                <div class="form-group col">
                <label>Menu</label>
                <Field name="menu_id" as="select" class="form-control"  :class="{ 'is-invalid': errors.menu_id }">
                  <option value="">Select a Menu</option>
                  <option :value="item.id" v-for="item in items" :key="item.id" >{{ item.name }}</option>
                </Field>
                <div class="invalid-feedback">{{ errors.menu_id }}</div>
              </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/items" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="item?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="item?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading item: {{item.error}}</div>
        </div>
    </template>
</template>
