import { defineStore } from 'pinia'
import {useCustomFetch} from "~/composables/useCustomFetch";

export interface AuthUser {
    id: string
    email: string,
    photo: string,
    token: string
    approved: true
}
interface State {
    isLogged: boolean
    user: AuthUser | null
    loading: boolean
    hasError: boolean
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
                hasError: false
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
                    console.log(email, password)
                    this.loading = true;
                    this.hasError = false;
                    const { data, pending, error }: any =
                        await useCustomFetch(`auth/login?email=${email}&password=${password}`, {
                            method: 'post',
                        });

                    if(error.value) {
                        this.hasError = true
                    }
                    if(data.value) {

                        this.user = {
                         id: data.value.data._id,
                         email: data.value.data.email,
                         photo: data.value.data.photo,
                         token: data.value.data.auth_token,
                         approved: data.value.data.account_approved
                        }
                        this.isLogged = true;
                    }
                setTimeout(() => this.loading = pending.value, 500);
            }
        },
        getters: {
            isAuthenticated: (state:State) => state.isLogged,
            isLoading: (state: State) => state.loading,
            authError: (state: State) => state.hasError,
            token: (state: State) => state.user?.token,
            userId: (state: State) => state.user?.id
        },
})
