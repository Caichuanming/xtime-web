import System from '@/views/portal/System'
import User from '@/views/portal/User'
import Role from '@/views/portal/Role'
import Menu from '@/views/portal/Menu'
import Permission from '@/views/portal/Permission'

export default [{
        path: "system",
        name: "系统列表",
        component: System,
        meta: {
            title: "breadcrumb",
        }
    },
    {
        path: "user",
        component: User,
        meta: {
            title: "breadcrumb",
        }
    },
    {
        path: "role",
        component: Role,
        meta: {
            title: "breadcrumb",
        }
    },
    {
        path: "menu",
        component: Menu,
        meta: {
            title: "breadcrumb",
        }
    },
    {
        path: "permission",
        component: Permission,
        meta: {
            title: "breadcrumb",
        }
    }
]