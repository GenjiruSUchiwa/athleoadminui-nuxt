import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()
    const router = useRouter()

    if(auth.isAuthenticated) {
        console.log("un authenticated")
        // return router.push({
        //     path: "/login",
        //     query: {
        //         next: to.path
        //     }
        // })
    }
})