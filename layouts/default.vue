<script setup lang="ts">
import {
  HomeIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import DashboardHeader from "~/components/DashboardHeader.vue";
import MobileSideBar from "~/components/MobileSideBar.vue";
import DesktopSideBar from "~/components/DesktopSideBar.vue";
import {NavigationItem, UserNavigation} from "~/types";
import {useAuthStore} from "~/store/auth";





const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', group:'index', icon: HomeIcon, current: true },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    group: 'users',
    children: [
      { name: 'Active', href: '/users', count: '12', current: false },
      { name: 'Inactive', href: '/users/inactive', count: '5', current: false },
    ],
  },
]
const userNavigation:  UserNavigation[] = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const authStore = useAuthStore()
const { currentRoute } = useRouter();
const path = currentRoute.value
function setActive(n:any) {
 console.log("kdjqldjlqsjdjlqsjdlqjdl")
  alert()
}

useHead({
  bodyAttrs: {
    class: 'h-full'
  },
  htmlAttrs: {
    class: 'h-full bg-gray-50'
  },
})
</script>

<template>
  <div>
    <MobileSideBar :navigation="navigation"
                   :user-navigation="userNavigation"
                   :path="path"
    />
    <DesktopSideBar
        @set-active="() => setActive"
        :navigation="navigation"
        :user-navigation="userNavigation"
        :path="path"
    />

    <div class="lg:pl-72">
     <DashboardHeader :user="authStore.identityUser"/>
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot/>
        </div>
      </main>
    </div>
  </div>
</template>
