<script setup lang="ts">
import axios from 'axios';


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

    // Verificar se senha e confirmação de senha são iguais

    if (user.password !== user.retypedPassword) {
        msg.value = 'Senhas não conferem';

        setTimeout(() => {
            msg.value = '';
        }, 3000);

        return;
    }

    // Enviar dados para o backend

    const api = import.meta.env.VITE_API_URL;

    const data = {
        key: route.params.key,
        name: user.name,
        password: user.password,
        passwordConfirmation: user.retypedPassword
    }

    console.log(data);

    axios.put(api + '/api/users/register/', data)
        .then(async (res) => {
            // Mandar requisição para o login com email e senha do usuário. O email é retornado no response do backend
            // Recebe o bearer token e salva no local storage
            // Redireciona para a página de dashboard

            console.log(res);

            const data = {
                email: res.data.email,
                password: user.password
            }

            await axios.post(api + '/api/auth', data).then((res) => {
                console.log(res);

                localStorage.setItem('token', res.data.token);

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

        <form action="">
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
            <button class="btn btn-outline btn-info btn-wide" @click.prevent="submitForm()">Enviar</button>
        </form>
    </section>
</template>

<style scoped></style>