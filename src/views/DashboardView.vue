<script setup lang="ts">
import checkTuyaContext from '@/utils/checkTuyaContext';
import axios from "axios";
import { useCookiesStore } from "@/stores/CookieStore";
import { useTuyaContextStore } from "@/stores/TuyaContextStore";

const email: string | null = sessionStorage.getItem('email');
const API = import.meta.env.VITE_API_URL;
const cookieStore = useCookiesStore();
const tuyaContextStore = useTuyaContextStore();
const token = cookieStore.getCookie();
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
    if (err.response.status === 401) {
      const modal = document.getElementById('modal-tuya-context') as HTMLDialogElement;
      modal.showModal();
    }
  });

</script>

<template>
  <Suspense>
    <TuyaContextForm></TuyaContextForm>
  </Suspense>

  <section>
    <NavbarComponent>
    </NavbarComponent>

    <header>
      <div>
        <h1>Dashboard</h1>
        <h2>
          Bem vindo!
        </h2>
      </div>
      <div>
        <button v-if="!tuyaContextStore.getTuyaContext" class="rounded-md btn btn-outline btn-secondary btn-xs">
          Adicionar device
        </button>
      </div>
    </header>

    <div id="card_grid">
      <div id="devices_header">
        <h2>
          Dispositivos
        </h2>
      </div>

      <div class="card bg-secondary text-primary-content justify">
        <div class="card-body">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
              <path fill="#301c27" d="M15.28 2a2 2 0 0 1 1.84 1.218l.057.15l3.552 10.658a1.5 1.5 0 0 1-1.29 1.968l-.133.006H13v4h3a1 1 0 0 1 .117 1.993L16 22H8a1 1 0 0 1-.117-1.993L8 20h3v-4H4.694a1.5 1.5 0 0 1-1.46-1.848l.037-.126L6.823 3.368a2 2 0 0 1 1.738-1.362L8.72 2h6.558ZM16 16a1 1 0 1 1 0 2a1 1 0 0 1 0-2Zm-.72-12H8.72L5.388 14h13.226L15.279 4Z"/></g></svg>
          </div>
          <h2 class="card-title">
            Lampada inteligente
          </h2>
          <div class="justify-center card-actions">
            <label class="cursor-pointer label">
              <input type="checkbox" class="toggle" checked />
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  @apply w-full h-full flex flex-col items-center p-4;
}

header {
  @apply w-full flex flex-row items-center mt-8 justify-between;
}

header div h1 {
  @apply text-xl font-bold;
}

header div h2 {
  @apply text-base font-light;
}

#card_grid {
  @apply grid grid-cols-2 gap-2 mt-8;
}

#devices_header {
  @apply col-span-2 mb-4;
}

#devices_header h2 {
  @apply text-xl font-bold;
}
</style>