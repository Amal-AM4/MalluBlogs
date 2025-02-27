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
          <input type="text" placeholder="Password" v-model="password">
          <pwd class="icon" />
        </div>
      </div>
      <button>Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import mail from "../assets/Icons/envelope-regular.svg"
  import pwd from "../assets/Icons/lock-alt-solid.svg"
  import user from "../assets/Icons/user-alt-light.svg"

  const firstName = ref('')
  const lastName = ref('')
  const username = ref('')
  const email = ref('')
  const password = ref('')

</script>

<style lang="scss">
  .register {
    h2 {
      max-width: 350px;
    }
  }
</style>
