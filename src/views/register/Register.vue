<template>
  <section class="d-flex justify-center bg-gray-50 dark:bg-gray-900">
    <div
      style="width: 500px"
      class="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Create and account
        </h1>
        <div
          v-if="shwoAlertMsg"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span class="block sm:inline capitalize">{{ alertMsg }}</span>
          <span @click="shwoAlertMsg=false" class="absolute top-0 bottom-0 right-0 py-3">
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
            type="email"
            v-model="register_form.email"
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
            type="password"
            name="password"
            v-model="register_form.password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label
            for="confirm-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm password</label
          >
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            v-model="register_form.confirm_password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <button
          :disabled="pageLoading"
            @click="registerUser"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create an account
          </button>
          <p class="text-sm mt-1 font-light text-gray-500 dark:text-gray-400">
            Already Have Account?
            <router-link
              to="/login"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Log In</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { authenticationStore } from "../../stores/authentication";
import { auth } from "../../firebase";
import router from "../../router";

export default {
  setup() {
    const store = authenticationStore();
    const auth1 = ref(auth);
    const login_form = ref({});
    const register_form = ref({
      email: null,
      password: null,
      confirm_password: null,
    });
    const shwoAlertMsg = ref(false);
    const alertMsg = ref("");
    const pageLoading=ref(false)
    const hideAlert = () => {
      setTimeout(() => {
        shwoAlertMsg.value = false;
      }, 2000);
    };
    const registerUser = async () => {
      if (
        !register_form.value.email ||
        !register_form.value.password ||
        !register_form.value.confirm_password
      ) {
        alertMsg.value = "All field required";
        shwoAlertMsg.value = true;
        hideAlert()
        return;
      }
      if (
        register_form.value.password != register_form.value.confirm_password
      ) {
        alertMsg.value = "password and confirm password does not match.";
        shwoAlertMsg.value = true;
        hideAlert()
        return;
      }
      try {
        pageLoading.value=false
        await store.register(register_form.value);
        router.push({ name: "login" });
      } catch (error) {
        shwoAlertMsg.value = true;
        switch (error.code) {
          case "auth/email-already-in-use":
            alertMsg.value = "Email Already in use";
            break;
          case "auth/invalid-email":
            alertMsg.value = "invalid email";
            break;
          case "auth/opertation-not-allowed":
            alertMsg.value = "operation not alloweed";
            break;
          case "auth/weak password":
            alertMsg.value = "weak password";
            break;
          default:
            alertMsg.value = "something went wrong";
        }
      }
    };
    return { login_form, register_form, registerUser, shwoAlertMsg, alertMsg,hideAlert,pageLoading };
  },
};
</script>
