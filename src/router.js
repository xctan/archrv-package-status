import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/TerminalPage'
import NotFound from '@/pages/NotFound'

const routes = [
    {
        path: '/',
        name: 'TerminalPage',
        component: TerminalPage
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