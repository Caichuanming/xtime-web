import api from "@/api"

export const dialogSubmit = (data) => {
    return api.request({
        url: `/api/system/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `/api/system/deleteById`,
        method: 'delete',
        params: data
    })
}

export const checkSysCodeSubmit = (data) => {
    return api.request({
        url: `/api/system/checkSysCode`,
        method: 'get',
        params: data
    })
}

export const listSubmit = (data) => {
    return api.request({
        url: `/api/system/list`,
        method: 'post',
        params: data
    })
}