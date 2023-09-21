<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from "@/stores/CookieStore";
const api = import.meta.env.VITE_API_URL;
const user = reactive({
    accessKey: '',
    baseUrl: '',
    secretKey: '',
});

const store = useCookiesStore();
const token = store.getCookie();
const submitForm = () => {
    let email = sessionStorage.getItem('email') as string;
    email = email.replace(/"/g, '');
    
    const url = 'http://localhost:3333/api/users/add-tuya-context/add';
    
    const headers = {
    'Authorization': `bearer Ng.kPI78OtSssWySJDfcTCs1Pxxq4SaAkPGKCc0b-KWdEYoHYSEv0b8QdeJ-XgY`,
    'Content-Type': 'application/json',
    }

    const body = JSON.stringify({
    accessKey: user.accessKey,
    baseUrl: user.baseUrl,
    secretKey: user.secretKey,
    email: email,
    })

    fetch(url, {
    method: 'PUT',
    headers: headers,
    body: body,
    })
    .then(res => {
    console.log(res);
    const modal = document.getElementById('modal-tuya-context') as HTMLDialogElement;
    modal.close();
    })
    .catch(err => {
    console.log(err);
    });
}
</script>
<template>
    <dialog id="modal-tuya-context" class="modal">
        <div class="modal-box">
            <form @submit.prevent="submitForm()">
            <div class="w-full max-w-xs form-control">
                <label class="label" for="accessKey">
                    <span class="label-text">Access key</span>
                </label>
                <input type="text" placeholder="Seu nome aqui" class="w-full max-w-xs input input-bordered" name="accessKey"
                    v-model="user.accessKey" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <div class="w-full max-w-xs form-control">
                <label class="label" for="baseUrl">
                    <span class="label-text">Base Url</span>
                </label>
                <input type="text" placeholder="Sua senha aqui" class="w-full max-w-xs input input-bordered"
                    name="baseUrl" v-model="user.baseUrl" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <div class="w-full max-w-xs form-control">
                <label class="label" for="secretKey">
                    <span class="label-text">Secret Key</span>
                </label>
                <input type="text" placeholder="Sua senha aqui" class="w-full max-w-xs input input-bordered"
                    name="secretKey" v-model="user.secretKey" required />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                </label>
            </div>
            <button class="btn btn-outline btn-info btn-wide" type="submit">Enviar</button>
           </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
<style scoped>

</style>