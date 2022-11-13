import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePermissionStore = defineStore("permission", () => {
  //* State
  const loading = ref(false);
  //* Getter
  const isLoading = computed(() => loading);
  //* Actions
  function SetLoading() {
    loading.value = true;
  }
  function ResetLoading() {
    loading.value = false;
  }
  return { isLoading, SetLoading, ResetLoading };
});
