import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { MessageTypeEnumerator } from "@/enumerators/messageTypeEnumerator";

interface iPopupInformation {
  messageType: MessageTypeEnumerator;
  message: string;
}

export const usePopupStore = defineStore("Popup", () => {
  //* State
  const popUp = ref<iPopupInformation | null>(null);
  //* Getter
  const computedPopUp = computed(() => popUp);
  //* Actions
  function SetPopUp(popupInformation: iPopupInformation) {
    popUp.value = popupInformation;
  }
  function Reset() {
    popUp.value = null;
  }
  return { computedPopUp, SetPopUp, Reset };
});
