// Fazer a requisição para a rota /api/users/add-tuya-context/:email
// Exportar a função

import axios from "axios";
import { useCookiesStore } from "@/stores/CookieStore";

const store = useCookiesStore();

export default function checkTuyaContext(API: string ,email: string | null) {

    if (!email) {
        return;
    }
    
    axios.post(API + '/users/add-tuya-context/', {
        headers: {
            'Authorization': 'Bearer ' + store.getCookie(),
        },
        data: {
            email
        }
    })
    .then(res => {
        console.log(res.data);
    })
}