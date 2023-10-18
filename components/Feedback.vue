<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid"
</script>

<template>
  <div class="border-l-4 border-red-400 bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <slot/>
      </div>
    </div>
  </div>
</template>