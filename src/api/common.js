import api from "@/api"
export const getMenuListData = (data) => {
    return api.request({
        url: `/api/menu/getHeaderNav`,
        method: 'post',
        params: data
    })
}

export const getSidebarSubmit = (data) => {
    return api.request({
        url: `/api/menu/getSidebar`,
        method: 'post',
        params: data
    })
}