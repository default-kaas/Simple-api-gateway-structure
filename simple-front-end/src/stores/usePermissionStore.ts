import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";

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
  //* State
  const permissions = ref<
    { url: String; permissionStatus: PermissionStatusEnumerator }[]
  >([]);
  //* Getter
  const permissionsComputed = computed(() => permissions);
  //* Actions
  function AddPermissionUrl(url: string) {
    permissions.value[permissions.value.length] = {
      url: url,
      permissionStatus: PermissionStatusEnumerator.unknown,
    };
  }
  function UpdatePermissions(
    permissionsUpdated: {
      url: String;
      permissionStatus: PermissionStatusEnumerator;
    }[]
  ) {
    permissions.value = permissionsUpdated;
  }
  return {
    isLoading,
    SetLoading,
    ResetLoading,
    permissionsComputed,
    AddPermissionUrl,
    UpdatePermissions,
  };
});
