<script setup lang="ts">
defineComponent({
  name: "BadgeCell"
})

export interface Props {
  data: boolean | string
}

const props = defineProps<{
  data: boolean | string
}>()


</script>
<template>
  <td class="whitespace-nowrap px-3 text-sm text-gray-500">
    <span
        :class="[(props.data)? 'bg-green-50 text-green-700 ring-green-600/20':'bg-red-50 text-red-700 ring-red-600/20']"
        class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset "
    >
    {{ props.data ? 'confirmed' : 'pending' }}
   </span>
  </td>
</template>