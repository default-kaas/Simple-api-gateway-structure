<script setup lang="ts">
import { ref } from "vue";
import { MessageTypeEnumerator } from "@/enumerators/messageTypeEnumerator";
import { usePopupStore } from "@/stores/usePopupStore";
const showPopup = ref(false);
const popupStore = usePopupStore();
popupStore.$onAction(async (action) => {
  if (action.name == "SetPopUp") {
    showPopup.value = true;
  }
  if (action.name == "Reset") {
    showPopup.value = false;
  }
});
</script>

<template>
  <div v-if="showPopup" id="pop-up-message" class="absolute mb-3">
    <MessageWrapper
      v-if="
        popupStore.computedPopUp.value?.messageType ==
        MessageTypeEnumerator.informational
      "
      class="bg-blue-400"
      :title="'Info'"
      :message="popupStore.computedPopUp.value?.message"
    />
    <MessageWrapper
      v-else-if="
        popupStore.computedPopUp.value?.messageType ==
        MessageTypeEnumerator.succes
      "
      class="bg-green-400"
      :title="'Succes'"
      :message="popupStore.computedPopUp.value?.message"
    />
    <MessageWrapper
      v-else-if="
        popupStore.computedPopUp.value?.messageType ==
        MessageTypeEnumerator.warning
      "
      class="bg-yellow-400"
      :title="'Warning'"
      :message="popupStore.computedPopUp.value?.message"
    />
    <MessageWrapper
      v-else
      class="bg-red-400"
      :title="'Error'"
      :message="popupStore.computedPopUp.value?.message"
    />
  </div>
</template>
