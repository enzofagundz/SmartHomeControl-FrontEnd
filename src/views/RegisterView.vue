<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from '@/stores/';
const store = useCookiesStore();

interface User {
    name: String,
    password: String,
    retypedPassword: String
}

const user: User = reactive({
    name: '',
    password: '',
    retypedPassword: ''
});

const msg = ref<String>('');
const route = useRoute();
const router = useRouter();

const submitForm = () => {
    if (user.password !== user.retypedPassword) {
        msg.value = 'Senhas não conferem';

        setTimeout(() => {
            msg.value = '';
        }, 3000);

        return;
    }

    const api = import.meta.env.VITE_API_URL;
    
    const data = {
        key: route.params.key,
        name: user.name,
        password: user.password,
        passwordConfirmation: user.retypedPassword
    }
    
    axios.put(api + '/users/register/', data)
        .then(async (res) => {
            const data = {
                email: res.data.email,
                password: user.password
            }
            sessionStorage.setItem('email', JSON.stringify(res.data.email));
            await axios.post(api + '/auth', data).then((res) => {
                store.setCookie('token', res.data.token);
                router.push('/dashboard');
            }).catch((err) => {
                console.log(err);
            });
        });
}
</script>

<template>
    <section>
        <Transition name="fade">
            <div class="alert alert-error" v-if="msg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current shrink-0" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ msg }}</span>
            </div>
        </Transition>

        <form @submit.prevent="submitForm()">
            <div class="w-full max-w-xs form-control">
                <label class="label" for="name">
                    <span class="label-text">Digite seu nome</span>
                </label>
                <input type="text" placeholder="Seu nome aqui" class="w-full max-w-xs input input-bordered" name="name"
                    v-model="user.name" required />
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
            <div class="w-full max-w-xs form-control">
                <label class="label" for="retypedPassword">
                    <span class="label-text">Digite novamente sua senha</span>
                </label>
                <input type="password" placeholder="Sua senha aqui" class="w-full max-w-xs input input-bordered"
                    name="retypedPassword" v-model="user.retypedPassword" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <button class="btn btn-outline btn-info btn-wide" type="submit">Enviar</button>
        </form>
    </section>
</template>

<style scoped></style>