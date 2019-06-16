import Home from "@/views/Home.vue"
import Match from "@/views/ticket/Match.vue"
import Movie from "@/views/ticket/Movie.vue"
import Showtime from "@/views/ticket/Showtime.vue"

export default [
    {
        path: "/match",
        component: Home
    },
    {
        path: "/movie",
        component: Home
    },
    {
        path: "/showtime",
        component: Home
    },
    {
        path: "/match/manage/list",
        component: Match
    },
    {
        path: "/movie/manage/list",
        component: Movie
    },
    {
        path: "/showtime/manage/list",
        component: Showtime
    }
]