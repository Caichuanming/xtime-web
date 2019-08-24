import api from "@/api"
import { commonBase } from "@/config"
export const getMenuListData = (data) => {
    return api.request({
        url: `${commonBase}/menu/getHeaderNav`,
        method: 'post',
        params: data
    })
}

export const getSidebarSubmit = (data) => {
    return api.request({
        url: `${commonBase}/menu/getSidebar`,
        method: 'post',
        params: data
    })
}