<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <!-- {{ user }} -->
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <!-- <form class="space-y-4 md:space-y-6" action="#"> -->
          <div
            v-if="shwoAlertMsg"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span class="block sm:inline capitalize">{{ alertMsg }}</span>
            <span
              @click="hideAlert"
              class="absolute top-0 bottom-0 right-0 py-3"
            >
              <svg
                class="fill-current h-6 w-6 pr-2 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              v-model="login_form.email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              v-model="login_form.password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>

          <button
            @click="login"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <router-link
              to="/"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Sign up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import { authenticationStore } from "../../stores/authentication";
import router from "../../router";
import { auth } from "../../firebase";
export default {
  setup() {
    let store = authenticationStore();
    const login_form = ref({
      email: null,
      password: null,
    });
    let shwoAlertMsg = ref(false);
    let alertMsg = ref(null);
    const login = async () => {
      if (!login_form.value.password || !login_form.value.email) {
        alertMsg.value = "All Field is required";
        shwoAlertMsg.value = true;
        return;
      }

      try {
    const data=  await store.loginAccount(login_form.value);
        if(data?.user?.email)
        {
        router.push({ name: "dashboard" });
        }
      } catch (error) {
        shwoAlertMsg.value = true;
        switch (error.code) {
          case "auth/user-not-found":
            alertMsg.value = "User Not Found";
            break;
          case "auth/wrong-password":
            alertMsg.value = "Wrrong Password";
            break
          default:
            alertMsg.value = "something went wrong";
        }
        return
      }
    
    };
    onMounted(() => {
      if (store.isLogin) {
        router.push({ name: "dashboard" });
      }
    });
    const hideAlert = () => {
      shwoAlertMsg.value != shwoAlertMsg.value;
    };
    const user = computed(() => store.user);
    return { login_form, login, user, hideAlert, alertMsg, shwoAlertMsg };
  },
};
</script>
