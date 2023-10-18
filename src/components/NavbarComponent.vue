<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from '@/stores';
const router = useRouter();
const api = import.meta.env.VITE_API_URL;
const store = useCookiesStore();

const logout = () => {

    const headers = { Authorization: 'Bearer ' +  store.getCookie()}

    axios.delete(api + '/auth', { headers }).then((res) => {
        console.log(res);
    })
    
    store.deleteCookie();
    router.push('/login');
}

</script>

<template>
    <div id="nav">
        <div>
            <router-link :to="{name: 'dashboard'}">
                Connectify
            </router-link>
        </div>
        <div>
            <div>
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="#f3f3f3" d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Perfil
                        </a>
                    </li>
                    <li>
                        <a>
                            Configurações
                        </a>
                    </li>
                    <li>
                        <a @click="logout()">
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #nav {
        @apply flex items-center w-full justify-between
    }

    #nav > div:first-child {
        @apply flex-1
    }

    #nav > div:first-child a {
        @apply text-xl normal-case btn btn-ghost text-primary p-0
    }
    
    #nav > div:last-child {
        @apply flex-none gap-2
    }

    #nav > div:last-child > div {
        @apply dropdown dropdown-end
    }
</style>