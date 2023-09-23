import { defineStore, acceptHMRUpdate } from "pinia";

export const useTuyaContextStore = defineStore('tuyaContext', {
    state: () => ({
        tuyaContext: false
    }),

    actions: {
        setTuyaContext(value: boolean): void {
            this.tuyaContext = value;
        },
    },

    getters: {
        getTuyaContext(): boolean {
            return this.tuyaContext;
        }
    }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useTuyaContextStore, import.meta.hot))
}
