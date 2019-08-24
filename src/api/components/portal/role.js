import api from "@/api"
import { commonBase } from "@/config"

export const dialogSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/deleteById`,
        method: 'delete',
        params: data
    })
}

export const listSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/list`,
        method: 'post',
        params: data
    })
}

export const findRoleTransferSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/findRoleByUserCode`,
        method: 'post',
        params: data
    })
}

export const saveUserRole = (data) => {
    return api.request({
        url: `${commonBase}/role/saveUserRole`,
        method: 'get',
        params: data
    })
}

export const checkRoleCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/checkRoleCode`,
        method: 'get',
        params: data
    })
}

export const judgeDeleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/role/judgeDelete`,
        method: 'post',
        params: data
    })
}

