<template>
  <div class="reset-password">

    <ModalComponent v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <LoadingComponent v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" to="/login">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email">
            <mail class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import mail from "../assets/Icons/envelope-regular.svg"
  import ModalComponent from "@/components/ModalComponent.vue";
  import LoadingComponent from "@/components/LoadingComponent.vue";
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";

  const email = ref('')
  const modalActive = ref(false)
  const modalMessage = ref('')
  const loading = ref(false)

  const resetPassword = async() => {
    loading.value = true

    if(!email.value) {
      modalMessage.value = "Empty value, please fill the field."
      loading.value = false
      modalActive.value = true
      return
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email.value)
      modalMessage.value = "If your account exists, you will receive a email"
    } catch (error) {
      modalMessage.value = error.message
    } finally {
      loading.value = false
      modalActive.value = true
    }
  }

  const closeModal = () => {
    modalActive.value = !modalActive.value
    email.value = ''
  }

</script>

<style lang="scss">
  .reset-password {
    position: relative;

    .form-wrap {
      .reset {
        h2 {
          margin-bottom: 8px;
        }

        p {
          text-align: center;
          margin-bottom: 32px;
        }
      }
    }
  }
</style>
