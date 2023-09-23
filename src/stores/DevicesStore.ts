import { defineStore, acceptHMRUpdate } from "pinia";
import { useCookiesStore } from './CookieStore';
export const useDevicesStore = defineStore('devicesStore', {
    state: () => ({
       devices: [] as Device[]
    }),

    actions: {
        getDevices() {
            const url = 'http://localhost:3333/api/users/devices/';
            
            const token = useCookiesStore().getToken;
            const headers = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
            }

            fetch(url, {
            method: 'GET',
            headers: headers,
            })
            .then(res => {
            console.log(res);            
            })
            .catch(err => {
            console.log(err);
            });
        } 
    },

    getters: {
       
    }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useDevicesStore, import.meta.hot))
}

type Device = {
    id: string;
    name: string;
}
