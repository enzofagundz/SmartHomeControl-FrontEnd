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
        <div>
            <h1>
                Connectify
            </h1>
        </div>
        <form action="">
            <div class="w-full max-w-xs form-control">
                <label class="label">
                    <span class="label-text">
                        Digite seu e-mail
                    </span>
                </label>
                <input type="email" placeholder="Digite seu e-mail aqui" class="w-full max-w-xs input input-bordered" v-model="email" name="email"/>
            </div>
            <button class="btn btn-primary btn-wide" @click.prevent="submitEmail()">Enviar</button>
        </form>
        <div id="register_link">
            <router-link :to="{ name: 'login'}" class="btn btn-active btn-link">
                Já possui uma conta? Faça login
            </router-link>
        </div>
    </section>
</template>

<style scoped>
    h1 {
        @apply text-4xl font-bold text-center;
    }

    section {
        @apply w-full h-1/2 flex flex-col items-center justify-evenly;
    }

    #register_link {
        @apply mt-4;
    }

    h1 {
        @apply text-4xl font-bold text-center;
    }

    .form-control {
        @apply mb-4;
    }
</style>