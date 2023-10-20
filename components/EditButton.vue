<script setup lang="ts">
import {PencilSquareIcon} from "@heroicons/vue/24/outline";


defineComponent({
  name: "EditButton"
})

export interface Props {
  data: boolean | string
}

const props = defineProps<{
  data: boolean | string
}>()


</script>
<template>
  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
    <a href="#" class="text-indigo-600 hover:text-indigo-900"
    >
      <PencilSquareIcon class="w-5 h-5"/>
    </a>
  </td>
</template>