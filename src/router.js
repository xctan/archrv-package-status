import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/TerminalPage'
import NotFound from '@/pages/NotFound'
import PackageList from '@/pages/PackageList'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: PackageList
    },
    {
        path: '/logs/:extLogUri(.*)',
        name: 'LogTerminal',
        component: TerminalPage,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})