import api from "@/api"
import { commonBase } from "@/config"

export const dialogSubmit = (data) => {
    return api.request({
        url: `${commonBase}/system/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/system/deleteById`,
        method: 'delete',
        params: data
    })
}

export const checkSysCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/system/checkSysCode`,
        method: 'get',
        params: data
    })
}

export const listSubmit = (data) => {
    return api.request({
        url: `${commonBase}/system/list`,
        method: 'post',
        params: data
    })
}