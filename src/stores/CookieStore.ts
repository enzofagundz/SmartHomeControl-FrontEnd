import { defineStore, acceptHMRUpdate } from "pinia";

export const useCookiesStore = defineStore('cookies', {
    state: () => ({
      token: ''
    }),

    actions: {
        setCookie(name: string, value: string): void {
            const d = new Date();
            const exdays = 5 * 60 * 60;
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = `expires=${d.toUTCString()};`;

            document.cookie = `${name}=${value}; ${expires}; path=/; Secure;`;
            this.token = value;
        },

        getCookie(): string {
            const cookie = document.cookie.split(';').find((c: string) => c.includes('token'));            
            if (cookie) {
                const token = cookie.split('=')[1];
                return token;
            }
            return '';
        },

        deleteCookie(): void {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;';
            this.token = '';
        },    
    },

    getters: {
        getToken(): String {
            return this.token;
        }
    }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useCookiesStore, import.meta.hot))
}
