<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from '@/stores/';

const store = useCookiesStore();
const router = useRouter();

interface User {
    email: String,
    password: String
}

const user: User = reactive({
    email: '',
    password: ''
});

const api = import.meta.env.VITE_API_URL;

const submitForm = () => {
    const data = {
        email: user.email,
        password: user.password,
    }

    axios.post(api + '/auth', data)
    .then((res) => {
        sessionStorage.setItem('email', JSON.stringify(user.email));
        store.setCookie('token', res.data.token);
        router.push('/dashboard');
    })
}
</script>

<template>
    <section>
        <div>
            <h1>
                Connectify
            </h1>
        </div>
        <form @submit.prevent="submitForm()">
            <div class="w-full max-w-xs form-control">
                <label class="label" for="email">
                    <span class="label-text">Digite seu e-mail</span>
                </label>
                <input type="text" placeholder="Seu nome aqui" class="w-full max-w-xs input input-bordered" name="email"
                    v-model="user.email" required />
            </div>
            <div class="w-full max-w-xs form-control">
                <label class="label" for="password">
                    <span class="label-text">Digite sua senha</span>
                </label>
                <input type="password" placeholder="Sua senha aqui" class="w-full max-w-xs input input-bordered"
                    name="password" v-model="user.password" required />
            </div>
            <button class="btn btn-wide btn-primary" type="submit">Enviar</button>
        </form>
        <div id="register_link">
            <router-link :to="{ name: 'register'}" class="btn btn-active btn-link">
                Não tem uma conta? Crie uma aqui
            </router-link>
        </div>
    </section>
</template>

<style scoped>
    section {
        @apply w-full h-2/3 flex flex-col items-center justify-evenly;
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

    button {
        @apply mt-4;
    }
</style>