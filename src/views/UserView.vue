<script setup lang="ts">
import axios from 'axios';

const email = ref<String>('');

const api = import.meta.env.VITE_API_URL;

const submitEmail = () => {
    const redirectUrl = 'http://localhost:5173/register';

    const data = {
        email: email.value,
        redirectUrl: redirectUrl
    }
    
    axios.post(api + '/users/register', data)
    .then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

    email.value = '';
}

</script>

<template>
    <section>
        <form action="">
            <div class="w-full max-w-xs form-control">
                <label class="label">
                    <span class="label-text">What is your name?</span>
                </label>
                <input type="email" placeholder="Digite seu e-mail aqui" class="w-full max-w-xs input input-bordered" v-model="email" name="email"/>
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <button class="btn btn-outline btn-info btn-wide" @click.prevent="submitEmail()">Enviar</button>
        </form>
    </section>
</template>

<style scoped>

</style>