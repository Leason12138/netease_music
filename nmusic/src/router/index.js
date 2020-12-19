import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hot from '../views/Hot.vue'
import PlayList from '../views/PlayList.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        meta: { isShowNav: true },
        component: Home,
    },
    {
        path: '/Search',
        name: 'Search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Search.vue'),
        meta: { isShowNav: true },

    }, {
        path: '/hot',
        name: 'Hot',
        component: Hot,
        meta: { isShowNav: true },


    },
    {
        path: '/playlist',
        name: 'PlayList',
        component: PlayList,


    },

]

const router = new VueRouter({
    routes
})

export default router