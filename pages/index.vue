<script setup>

import UsersStats from "~/components/UsersStats.vue";
import {useStatsStore} from "~/store/stats";
import {useUsersStore} from "~/store/users";


definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Dashboard | Athleo Admin',
})

const store = useStatsStore()

let metrics = await store.fill();
let users = useUsersStore()
 users.fill()


</script>

<template>
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">Dashboard data report</h2>
      <UsersStats/>
      <SportsStats/>
    </div>
  </div>
</template>
