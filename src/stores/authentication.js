import { defineStore } from "pinia";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
export const authenticationStore = defineStore("counter", {
  state: () => ({
    currentUser: null,
    login: false,
  }),
  getters: {
    user: (state) => state.currentUser,
    isLogin: (state) => state.login,
  },
  actions: {
    async loginAccount(details) {
      const { email, password } = details;
      try {
        const data=await signInWithEmailAndPassword(getAuth(), email, password);
        this.currentUser = auth.currentUser;
        this.login = true;
        return data
      } catch (error) {
        return error;
      }
    },
    async register(details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
      } catch (error) {
        return error;
      }
      this.currentUser = auth.currentUser;
    },
    async logout() {
      try {
        await signOut(auth);
        this.login = false
      } catch (error) {
        return error;
      }
    },
    fetchUser() {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.login = false
          this.currentUser = null;
        } else {
          this.login = true;
          this.currentUser = user;
          
        }
      });
    },
  },
});
