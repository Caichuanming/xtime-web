import env from "../build/env"
function commonBaseUrl() {
    return env === "development" ?
        "//portal-gateway.xtime.com" :
        "//portal-gateway.xtime.com"
}
export const commonBase = commonBaseUrl()