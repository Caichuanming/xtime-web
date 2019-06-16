import Home from "@/views/Home.vue"
import Member from "@/views/cmc/Member.vue"
import Snack from "@/views/cmc/Snack.vue"

export default [
    {
        path: "/member",
        component: Home
    },
    {
        path: "/snack",
        component: Home
    },
    {
        path: "/member/manage/list",
        component: Member
    },
    {
        path: "/snack/manage/list",
        component: Snack
    }
]