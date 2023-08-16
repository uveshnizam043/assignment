<template>
  <section>
    <div class="bg-gray-100">
      <span class="pr-1 text-xl font-semibold">UID:</span>
      <span class="text-lg">{{ store.currentUser?.uid }}</span>
    </div>
    <div>
      <span class="pr-2 text-xl font-semibol">Email:</span>
      <span class="text-lg">{{ store.currentUser?.email }}</span>
    </div>
    <div class="flex justify-end mt-2">
      <button
        @click="singOut"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  
  </section>
</template>

<script>
import { authenticationStore } from "../../stores/authentication";
import router from "../../router/index";
export default {
  setup() {
    const store = authenticationStore();
    const singOut = async () => {
      try {
        await store.logout();
        router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      store,
      singOut,
    };
  },
};
</script>
