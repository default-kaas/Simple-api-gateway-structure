<script setup lang="ts">
import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
import { ref } from "vue";
import { usePermissionStore } from "@/stores/usePermissionStore";
import { permissionRequest } from "@/apis/useRequestHandler";
const props = defineProps({
  permissionStatusName: {
    type: String,
    required: true,
  },
  permissionStatusApiUrl: {
    type: String,
    required: true,
  },
});
const permissionStatusEnumerator = ref(PermissionStatusEnumerator.unknown);
const permissionStore = usePermissionStore();
permissionStore.$onAction(async (action) => {
  if (action.name == "ResetLoading") {
    permissionStatusEnumerator.value = await permissionRequest(
      props.permissionStatusApiUrl
    );
  }
});
</script>

<template>
  <div class="flex my-2 w-96 rounded border border-black shadow">
    <p class="flex items-center justify-center flex-grow">
      {{ permissionStatusName }}
    </p>
    <div
      class="flex items-center justify-center bg-custom-vue-gray border-black rounded-r py-1 px-2 h-12"
    >
      <PermissionStatusIcon
        :permissionStatusEnumerator="permissionStatusEnumerator"
      />
    </div>
  </div>
</template>
