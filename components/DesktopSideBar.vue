<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {ChevronRightIcon} from "@heroicons/vue/20/solid";
import {PropType} from "vue";
import {NavigationItem, UserNavigation} from "~/types";
import {useSidebarStore} from "~/store/sidebar";
import {RouteLocationNormalizedLoaded} from "vue-router";

defineComponent({
  name: "DesktopSideBar"
})
//const navigation = store.menu
const props = defineProps({
  navigation: {
    type: Array as PropType<NavigationItem[]>,
    required: true,
  },
  userNavigation: {
    type: Object as PropType<UserNavigation[]>,
    required: true
  },
  path: {
    type: Object as PropType<RouteLocationNormalizedLoaded>,
    required: true
  }
})

const navigation = props.navigation
const store = useSidebarStore()
const path = props.path
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
                <a v-if="!item.children" :href="item.href" :class="[item.href === path.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                  {{ item.name }}
                </a>
                <Disclosure as="div" v-else v-slot="{ open, close }" :default-open="(true)">
                  <DisclosureButton :class="[(path.path.includes(item.group)) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                    {{ item.name }}
                    <ChevronRightIcon :class="[(open) ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']" aria-hidden="true" />
                  </DisclosureButton>
                  <DisclosurePanel as="ul" class="mt-1 px-2">
                    <li v-for="subItem in item.children" :key="subItem.name">
                      <!-- 44px -->
                      <DisclosureButton @click="$emit('setActive', 'fdfd')"
                                        as="a" :href="subItem.href"
                                        :class="[(subItem.href === path.path) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'flex rounded-md py-2 pr-2 pl-9 text-sm leading-6']">
                        {{ subItem.name }}
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