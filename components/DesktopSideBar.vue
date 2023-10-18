<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import {Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
import {ChevronRightIcon} from "@heroicons/vue/20/solid";

defineComponent({
  name: "DesktopSideBar"
})

const sidebarOpen = ref(false)
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
</script>

<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a v-if="!item.children" :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                  {{ item.name }}
                </a>
                <Disclosure as="div" v-else v-slot="{ open }">
                  <DisclosureButton :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                    {{ item.name }}
                    <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']" aria-hidden="true" />
                  </DisclosureButton>
                  <DisclosurePanel as="ul" class="mt-1 px-2">
                    <li v-for="subItem in item.children" :key="subItem.name">
                      <!-- 44px -->
                      <DisclosureButton as="a" :href="subItem.href" :class="[subItem.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'flex rounded-md py-2 pr-2 pl-9 text-sm leading-6']">{{ subItem.name }}
                        <span v-if="subItem.count" class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700" aria-hidden="true">{{ subItem.count }}</span>
                      </DisclosureButton>
                    </li>
                  </DisclosurePanel>
                </Disclosure>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
              <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>