<script setup lang="ts">
import { authenticationRequestCall } from "@/apis/useAuthenticationRequestHandler";
import { ref } from "vue";
const userName = ref("");
const password = ref("");
const isLoading = ref(false);
async function Login() {
  isLoading.value = true;
  await authenticationRequestCall({
    userName: userName.value,
    password: password.value,
  });
  isLoading.value = false;
}
</script>

<template>
  <section>
    <div class="px-6 py-12">
      <div class="flex justify-center items-center flex-wrap">
        <div class="w-1/2">
          <div>
            <!-- Username input -->
            <div class="mb-6">
              <input
                v-model="userName"
                type="text"
                class="form-control block w-full px-4 py-2 bg-clip-padding border border-solid border-black shadow-md rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                placeholder="Username"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                v-model="password"
                type="password"
                class="form-control block w-full px-4 py-2 bg-clip-padding border border-solid border-black shadow-md rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <!-- Submit button -->
            <button
              :disabled="isLoading"
              @click="Login()"
              type="submit"
              class="inline-block px-7 py-3 bg-custom-vue-green text-white leading-snug uppercase rounded shadow-md hover:bg-custom-vue-gray hover:shadow-lg disabled:bg-gray-300 w-full"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
