import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/TerminalPage'
import NotFound from '@/pages/NotFound'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TerminalPage
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