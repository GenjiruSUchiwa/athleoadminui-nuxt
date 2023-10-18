import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    const router = useRouter()

    if(!auth.isAuthenticated) {
        console.log('redirect to login')
        return router.push({
            path: "/login",
            query: {
                next: to.path
            }
        })
    }
})