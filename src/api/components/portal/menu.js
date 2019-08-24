import api from "@/api"
import { commonBase } from "@/config"
export const dialogSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/deleteById`,
        method: 'delete',
        params: data
    })
}

export const getMenuDataSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/getMenuTree`,
        method: 'get',
        params: data
    })
}

export const getPermMenuDataSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/getPermMenuTree`,
        method: 'get',
        params: data
    })
}

export const checkMenuCodeSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/checkMenuCode`,
        method: 'get',
        params: data
    })
}

export const checkMenuRankSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/checkMenuRank`,
        method: 'get',
        params: data
    })
}

export const judgeDeleteSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/judgeDelete`,
        method: 'post',
        params: data
    })
}
