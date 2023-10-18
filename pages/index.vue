<script setup>
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import UsersStats from "~/components/UsersStats.vue";
import {useStatsStore} from "~/store/stats";


definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Dashboard | Athleo Admin',
})

const store = useStatsStore()

let metrics = await store.fill();

console.log(metrics)


</script>

<template>
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">Dashboard data report</h2>
      <UsersStats/>
      <SportsStats/>
    </div>
  </div>
</template>
