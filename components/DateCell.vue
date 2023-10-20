<script setup lang="ts">
defineComponent({
  name: "DateCell"
})

const props = defineProps({
  date: String,
})
</script>
<template>
  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ props.date }}</td>
</template>