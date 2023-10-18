import { defineStore } from 'pinia'

export interface AuthUser extends Record<string, any> {}
interface State {
    isLogged: boolean
    user: AuthUser | null
    loading: boolean
}
interface LoginRequestPayload {
    email: string
    password: string
}
export const useAuthStore = defineStore(
    'auth', {
        state: (): State => {
            const { token, user } = useAuthStorage()

            return {
                isLogged: !!token.value,
                user: user.value,
                loading: false,
            }
        },
    actions: {
            logout() {
                const { clear } = useAuthStorage()
                clear()

                this.isLogged = true
                this.user = null
            },
        async login({email, password}: LoginRequestPayload): Promise<void>
            {
                const { data, pending }: any =
                await useFetch('https://dummyjson.com/auth/login', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        email,
                        password,
                    },
                });
                this.loading = pending;
                if(data.value) {
                    this.user = data?.value?.token;
                    this.isLogged = true;
                    
                    const { store } = useAuthStorage()
                    store(data?.value?.token,data?.value?.user);
                }
            }
        },
        getters: {
            isAuthenticated: (state:State) => state.isLogged,
        },
})
