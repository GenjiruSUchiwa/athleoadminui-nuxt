<script setup lang="ts">
defineComponent({
  name: "EmailCell"
})

const props = defineProps({
  email: String,
})
</script>
<template>
  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ props.email }}</td>
</template>