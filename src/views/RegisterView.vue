<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" to="/login">Login</router-link>
      </p>
      <h2>Create Your MalluBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <mail class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password">
          <pwd class="icon" />
        </div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { useToast } from "vue-toastification";
  import { useRouter  } from "vue-router";

  import mail from "../assets/Icons/envelope-regular.svg"
  import pwd from "../assets/Icons/lock-alt-solid.svg"
  import user from "../assets/Icons/user-alt-light.svg"
  import db from "../firebase/firebaseInit"

  const firstName = ref('')
  const lastName = ref('')
  const username = ref('')
  const email = ref('')
  const password = ref('')

  const toast = useToast()
  const router = useRouter()

  const register = async () => {

    if (
      firstName.value === "" ||
      lastName.value === "" ||
      username.value === "" ||
      email.value === "" ||
      password.value === ""
    )
    {
      toast.error("Please fill out all the fields!");
      return; // in here return works like break statement to exit from the code
    }

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user; // ✅ Corrected `result.user`

      // ✅ Corrected Firestore syntax for Firebase v9+
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
      });

      // ✅ Navigate after successful registration
      router.push("/login");

      // success message
      toast.success("Registration successful! Now you can login to your account.")
    } catch (error) {
      console.error(error);
    }

  };


</script>

<style lang="scss">

  .register {
    h2 {
      max-width: 350px;
    }
  }
</style>
