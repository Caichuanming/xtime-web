import api from "@/api"
import { commonBase } from "@/config"
export const doLogin = (data) => {
    console.log('commonBase - ', commonBase)
    return api.request({
        url: `${commonBase}/user/login`,
        method: 'get',
        params: data
    })
}