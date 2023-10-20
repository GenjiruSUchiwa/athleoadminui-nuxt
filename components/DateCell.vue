<script setup lang="ts">
import { format } from 'date-fns'


defineComponent({
  name: "DateCell"
})

const props = defineProps({
  date: Date,
})
</script>
<template>
  <td class="whitespace-nowrap px-3 text-sm text-gray-500">
    {{ format(props.date, 'MMMM d, yyyy') }}


  </td>
</template>