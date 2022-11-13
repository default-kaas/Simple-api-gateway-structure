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
      <div
        class="rounded-full bg-green-500"
        v-if="permissionStatusEnumerator == PermissionStatusEnumerator.ok"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="black"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <div
        class="rounded-full bg-orange-500"
        v-else-if="
          permissionStatusEnumerator == PermissionStatusEnumerator.forbidden
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </div>
      <div
        class="rounded-full bg-red-500"
        v-else-if="
          permissionStatusEnumerator == PermissionStatusEnumerator.unauthorized
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div class="rounded-full bg-gray-300" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
