import axios from "axios";
import { useCookiesStore } from "@/stores/CookieStore";

const store = useCookiesStore();
const API = import.meta.env.VITE_API_URL;
export default async function checkTuyaContext(email: string | null): Promise<any> {
    if (!email) {
        return;
    }
    const token = store.getCookie();
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
        if(err.response.status === 401) {
            return false;
        }
    });
}