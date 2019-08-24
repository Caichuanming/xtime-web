export default {
    namespaced: true,
    state: {
        system: '',
        firstLevelMenu: '',
        secondLevelMenu: '',
        thirdLevelMenu: '',
        systemCode: '',
        menuCode: '',
        firstMenuCode: '',
        secondMenuCode: '',
        thirdMenuCode: '',
        sidebarList: '',
        breadcrumbList: '',
        userCode: localStorage.userCode,
        username: localStorage.username,
        userRoleCode:'',
        userRoleName:'',
        isLogin: localStorage.isLogin
    },
    getters: {
        getSysAndFirst: state => {
            return `${state.systemCode}/${state.firstMenuCode}`
        },
        getUserCode: state => {
            return `${state.userCode}`
        }
    },
    mutations: {
        changeSysAndFirst: (state, payload) => {
            state.system = payload.system
            state.firstLevelMenu = payload.first
            state.systemCode = payload.systemCode
            state.firstMenuCode = payload.firstMenuCode
        },
        changeSecondLevelMenu: (state, secondLevelMenu) => {
            state.secondLevelMenu = secondLevelMenu
        },
        changeThirdLevelMenu: (state, thirdLevelMenu) => {
            state.thirdLevelMenu = thirdLevelMenu
        },
        changeSysCode: (state, systemCode) => {
            state.systemCode = systemCode
        },
        changeMenuCode: (state, menuCode) => {
            state.menuCode = menuCode
        },
        changeSidebarList: (state, sidebarList) => {
            state.sidebarList = sidebarList
        },
        changeBreadcrumbList: (state, breadcrumbList) => {
            state.breadcrumbList = breadcrumbList;
        },
        changeUserInfo: (state, userInfo) => {
            state.userCode = userInfo.userCode
            state.username = userInfo.username
            state.userRoleCode = userInfo.userRoleCode
            state.userRoleName = userInfo.userRoleName
            state.isLogin = userInfo.isLogin
            localStorage.isLogin = userInfo.isLogin
            localStorage.username = userInfo.username
            localStorage.userCode = userInfo.userCode
        }
    }
}