import { defineStore } from "pinia";

export const useCookiesStore = defineStore("cookies", () => {
    const token = ref<String>('')

    function setCookie(name: string, value: string): void {
        
        const d = new Date();
        const exdays = 5 * 60 * 60;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = `expires=${d.toUTCString()};`;

        document.cookie = `${name}=${value}; ${expires}; path=/; Secure;`;
        token.value = value;
    }

    function getCookie(): string {
        const cookie = document.cookie.split(';').find(row => row.startsWith('token'));
        if (cookie) {
            const token = cookie.split('=')[1];
            return token;
        }
        
        return '';
    }

    function deleteCookie(): void {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;';
        token.value = '';
    }

    function getToken(): String {
        return token.value;
    }

    return { getCookie, setCookie, deleteCookie, getToken }
});