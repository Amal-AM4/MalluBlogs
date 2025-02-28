<template>
  <div class="reset-password">
    <ModalComponent v-if="modalActive" v-on:close-modal="closeModal" />
    <LoadingComponent v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email">
            <mail class="icon" />
          </div>
        </div>
        <button>Reset</button>
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


  const email = ref('')
  const modalActive = ref(false)
  const modalMessage = ref('')
  const loading = ref(false)

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
