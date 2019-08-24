import api from "@/api"
import { commonBase } from "@/config"

export const dialogSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/deleteById`,
        method: 'delete',
        params: data
    })
}

export const listSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/list`,
        method: 'post',
        params: data
    })
}

export const getPermDataSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/getPermTree`,
        method: 'get',
        params: data
    })
}

export const getPermInfoSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/getPermInfoSubmit`,
        method: 'get',
        params: data
    })
}

export const getPermDataByUserCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/getPermTreeByUserCode`,
        method: 'get',
        params: data
    })
}

export const checkPermCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/checkPermCode`,
        method: 'get',
        params: data
    })
}

export const judgeDeleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/perm/judgeDelete`,
        method: 'post',
        params: data
    })
}