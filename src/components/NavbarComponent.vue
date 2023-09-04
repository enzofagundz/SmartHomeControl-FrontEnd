<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from '@/stores';
const router = useRouter();
const api = import.meta.env.VITE_API_URL;
const store = useCookiesStore();

const logout = () => {

    const headers = { Authorization: 'Bearer ' +  store.getCookie('token')}

    axios.delete(api + '/api/auth', { headers }).then((res) => {
        console.log(res);
    })
    
    router.push('/login');
}

</script>

<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <a class="text-xl normal-case btn btn-ghost">Connectify</a>
        </div>
        <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li>
                        <a @click.prevent="logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>