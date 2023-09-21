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
        <form @submit.prevent="submitForm()">
            <div class="w-full max-w-xs form-control">
                <label class="label" for="email">
                    <span class="label-text">Digite seu e-mail</span>
                </label>
                <input type="text" placeholder="Seu nome aqui" class="w-full max-w-xs input input-bordered" name="email"
                    v-model="user.email" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <div class="w-full max-w-xs form-control">
                <label class="label" for="password">
                    <span class="label-text">Digite sua senha</span>
                </label>
                <input type="password" placeholder="Sua senha aqui" class="w-full max-w-xs input input-bordered"
                    name="password" v-model="user.password" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <button class="btn btn-outline btn-info btn-wide" type="submit">Enviar</button>
        </form>
    </section>
</template>

<style scoped></style>