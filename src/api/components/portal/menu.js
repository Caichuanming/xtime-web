import api from "@/api"

export const dialogSubmit = (data) => {
    return api.request({
        url: `/api/menu/createOrUpdate`,
        method: 'put',
        params: data
    })
}

export const deleteSubmit = (data) => {
    return api.request({
        url: `/api/menu/deleteById`,
        method: 'delete',
        params: data
    })
}

export const getMenuDataSubmit = (data) => {
    return api.request({
        url: `/api/menu/getMenuTree`,
        method: 'get',
        params: data
    })
}

export const getPermMenuDataSubmit = (data) => {
    return api.request({
        url: `/api/menu/getPermMenuTree`,
        method: 'get',
        params: data
    })
}

export const checkMenuCodeSubmit = (data) => {
    return api.request({
        url: `/api/menu/checkMenuCode`,
        method: 'get',
        params: data
    })
}

export const checkMenuRankSubmit = (data) => {
    return api.request({
        url: `/api/menu/checkMenuRank`,
        method: 'get',
        params: data
    })
}

export const judgeDeleteSubmit = (data) => {
    return api.request({
        url: `/api/menu/judgeDelete`,
        method: 'post',
        params: data
    })
}
