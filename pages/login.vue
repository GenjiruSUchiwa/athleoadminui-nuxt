<script setup lang="ts">
import {useAuthStore} from "~/store/auth";
import {useForm} from "vee-validate";
import {object, string} from "yup";

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Log In | Athleo Admin',
})


const { handleSubmit } = useForm({
  validationSchema: object({
    email: string().required().email(),
    password: string().required()
  })
})

const { value: email } = useField('email', undefined, {
  initialValue:'dkjsoft@gmail.com'
})

const { value: password } = useField('password', undefined, {
  initialValue:'azerty123'
})

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const storage  = useAuthStorage()


const onSubmit = handleSubmit(async ({email, password}) => {

    await authStore.login({email: email, password: password})
    if(authStore.isAuthenticated)
    {
      const { store } = useAuthStorage()
      store(authStore.token, authStore.identityUser)

      await router.push((route.query as any).next || '/')
    }
})

useHead({
  title: 'Login | Athleo Admin',
})
</script>

<template>
  <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
             alt="Your Company"/>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
          account</h2>
      </div>
      <Feedback v-if="authStore.authError">
        <p class="text-sm text-red-700">
          User not found. Please verify your
          {{ ' ' }}
          <span  class="font-medium text-red-700 underline">Email</span> or
          <span class="font-medium text-red-700 underline">Password</span>
        </p>
      </Feedback>
      <form class="space-y-6" @submit.prevent="onSubmit" method="POST">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"/>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address"
                   v-model="email"
                   name="email"
                   type="email"
                   autocomplete="email"
                   required=""
                   class="base-input"
                   placeholder="Email address"/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password"
                   v-model="password"
                   name="password"
                   type="password"
                   autocomplete="current-password"
                   required=""
                   class="base-input"
                   placeholder="Password"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-6">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>

        <div>
          <button type="submit"
                  :disabled="authStore.isLoading"
                  :class="{ 'opacity-50 cursor-not-allowed': authStore.isLoading }"
                  class="btn btn-primary"
          >
            <span v-if="authStore.isLoading" class="flex">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
              </span>
            <span v-else class="flex">
            Sign in
              </span>
          </button>
        </div>
      </form>

      <p class="text-center text-sm leading-6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
      </p>
    </div>
  </div>
</template>

