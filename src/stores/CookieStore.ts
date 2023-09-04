import { defineStore } from "pinia";

export const useCookiesStore = defineStore("cookies", () => {

    function setCookie(name: string, value: string): void {
        document.cookie = `${name}=${value}; expires=${new Date().toUTCString()}; path=/`;
    }

    function getCookie(): string {
        const cookies = document.cookie.split(';');
        return cookies[0].split('=')[1];
    }

    function deleteCookie(): void {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    return { getCookie, setCookie, deleteCookie }
});