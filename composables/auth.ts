import {AuthUser} from '~/store/auth';

export const useAuthStorage = (
    { authTokenKey, authUserKey } = {
        authTokenKey: 'auth.token',
        authUserKey: 'auth.user',
    },
) => {
    const user = useCookie<AuthUser|null>(authUserKey)
    const token = useCookie<string>(authTokenKey)

    const store = (newToken: string, newUser: Record<string, any>) => {
        token.value = newToken
        user.value = newUser
    }

    const clear = () => {
        user.value = null
        token.value = ''
    }

    return { store, clear, user, token }
}
