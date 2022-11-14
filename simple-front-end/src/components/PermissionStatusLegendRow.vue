<script setup lang="ts">
import type { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
defineProps({
  text: {
    type: String,
    required: true,
  },
  httpText: {
    type: String,
    required: false,
  },
  permissionStatusEnumerator: {
    type: Number as () => PermissionStatusEnumerator,
    required: true,
  },
});
</script>

<template>
  <div class="flex py-1 px-2 my-2 bg-gray-200 rounded">
    <div class="grow px-2">{{ text }}</div>
    <div v-if="httpText" class="ml-1 mr-2 px-3 bg-gray-400 text-white rounded">
      {{ httpText }}
    </div>
    <PermissionStatusIcon
      :permissionStatusEnumerator="permissionStatusEnumerator"
    />
  </div>
</template>
