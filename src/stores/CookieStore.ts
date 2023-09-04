import { defineStore } from "pinia";

export const useCookiesStore = defineStore("cookies", () => {
    function setCookie(name: string, value: string): void {
        document.cookie = `${name}=${value};`
    }

    function getCookie(): string {
        const cookies = document.cookie.split(';');
        return cookies[0].split('=')[1];
    }

    return { getCookie, setCookie }
});