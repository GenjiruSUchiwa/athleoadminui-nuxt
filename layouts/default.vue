<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel, Disclosure, DisclosureButton, DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import DashboardHeader from "~/components/DashboardHeader.vue";
import {useAuthStore} from "~/store/auth";
import MobileSideBar from "~/components/MobileSideBar.vue";
import DesktopSideBar from "~/components/DesktopSideBar.vue";
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Active', href: '#', count: '12', current: false },
      { name: 'Inactive', href: '#', count: '5', current: false },
    ],
  },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const authStore = useAuthStore()

const sidebarOpen = ref(false)

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
    <MobileSideBar/>
    <DesktopSideBar/>

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
