import api from "@/api"
import {commonBase} from "@/config"

export const dialogSubmit = (data) => {
    return api.request({
        url: `${commonBase}/user/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/user/deleteById`,
        method: 'delete',
        params: data
    })
}

export const listSubmit = (data) => {
    return api.request({
        url: `${commonBase}/user/list`,
        method: 'post',
        params: data
    })
}

export const checkUserCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/user/checkUserCode`,
        method: 'get',
        params: data
    })
}

export const judgeDeleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/user/judgeDelete`,
        method: 'post',
        params: data
    })
}