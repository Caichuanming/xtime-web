import api from "@/api"

export const listSubmit = (data) => {
    return api.request({
        url: `/api/apiUser/getById`,
        method: 'get',
        params: data
    })
}
