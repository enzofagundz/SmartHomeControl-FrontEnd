<script setup lang="ts">
import axios from 'axios';
import { useCookiesStore } from "@/stores/CookieStore";
import { useTuyaContextStore } from "@/stores/TuyaContextStore";
const api = import.meta.env.VITE_API_URL;
const user = reactive({
    accessKey: '',
    baseUrl: '',
    secretKey: '',
});

const cookieStore = useCookiesStore();
const tuyaContextStore = useTuyaContextStore();
const token = cookieStore.getCookie();
const submitForm = () => {
    let email = sessionStorage.getItem('email') as string;
    email = email.replace(/"/g, '');

    const url = 'http://localhost:3333/api/users/add-tuya-context/add';

    const headers = {
        'Authorization': `bearer ${token}`,
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
    }).then(res => {
        console.log(res);
        const modal = document.getElementById('modal-tuya-context') as HTMLDialogElement;
        tuyaContextStore.setTuyaContext(true);
        modal.close();
    }).catch(err => {
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
                        <span class="label-text">
                            Chave de acesso
                        </span>
                    </label>
                    <input type="text" placeholder="Sua chave de acesso aqui" class="w-full max-w-xs input input-bordered"
                        name="accessKey" v-model="user.accessKey" required />
                </div>
                <div class="w-full max-w-xs form-control" >
                    <label class="label" for="baseUrl">
                        <span class="label-text">Base URL</span>
                    </label>
                    <input type="text" placeholder="Sua base URL aqui aqui" class="w-full max-w-xs input input-bordered"
                        name="baseUrl" v-model="user.baseUrl" required />
                </div>
                <div class="w-full max-w-xs form-control">
                    <label class="label" for="secretKey">
                        <span class="label-text">
                            Chave secreta
                        </span>
                    </label>
                    <input type="text" placeholder="Sua chave secreta aqui" class="w-full max-w-xs input input-bordered"
                        name="secretKey" v-model="user.secretKey" required />
                </div>
                <button class="w-full mt-4 btn btn-primary" type="submit">
                    Adicionar
                </button>
            </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>
                Cancelar
            </button>
        </form>
    </dialog>
</template>
<style scoped></style>