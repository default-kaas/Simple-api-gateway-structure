<script setup lang="ts">
import { usePopupStore } from "@/stores/usePopupStore";
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const popupStore = usePopupStore();
function closePopUp() {
  popupStore.Reset();
}
</script>

<template>
  <div class="p-2 rounded flex cursor-pointer" v-on:click="closePopUp()">
    <div>
      <div class="font-bold m-2">{{ title }}</div>
      <div class="m-2">{{ message }}</div>
    </div>
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
</template>
