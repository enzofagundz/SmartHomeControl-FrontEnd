<script setup lang="ts">
import checkTuyaContext from '@/utils/checkTuyaContext';
import axios from "axios";
import { useCookiesStore } from "@/stores/CookieStore";

const email: string | null = sessionStorage.getItem('email');
const API = import.meta.env.VITE_API_URL;
const store = useCookiesStore();
const token = store.getCookie();
axios.post(API + '/users/add-tuya-context/', {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    data: {
        email: email
    }
})
.then(res => {
    return true;
}).catch(err => {
    if(err.response.status === 401) {
        // Se o usuario chegou aqui, é por que ele precisa cadastrar o TuyaContext
        const modal = document.getElementById('modal-tuya-context') as HTMLDialogElement;
        modal.showModal();
    }
});

</script>

<template>
  <Suspense>
    
    <TuyaContextForm></TuyaContextForm>
  </Suspense>
</template>

<style scoped></style>