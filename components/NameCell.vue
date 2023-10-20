<script setup lang="ts">

defineComponent({
  name: "NameCell"
})

const props = defineProps({
  name: String,
  image: String
})
</script>
<template>
  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
    <div class="flex items-center">
      <div class="h-11 w-11 flex-shrink-0">
        <img class="h-11 w-11 rounded-full" :src="props.image" alt=""/>
      </div>
      <div class="ml-4">
        <div class="font-medium text-gray-900">{{ props.name ?? 'Unknow' }}</div>
      </div>
    </div>
  </td>
</template>