<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" to="/register">Register</router-link>
      </p>
      <h2>Login to MalluBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <mail class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password">
          <pwd class="icon" />
        </div>
      </div>
      <router-link class="forgot-password" to="/forgot-password">Forgot your password?</router-link>
      <button @click.prevent="signIn">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import mail from "../assets/Icons/envelope-regular.svg"
  import pwd from "../assets/Icons/lock-alt-solid.svg"

  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  import { useToast } from "vue-toastification";
  import { useRouter } from "vue-router";

  const email = ref('')
  const password = ref('')

  const toast = useToast()
  const router = useRouter()

  const signIn = async() => {
    if (!email.value || !password.value) {
      toast.error("Please fill in both fields!");
      return;
    }

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user

      console.log("User UID:", user.uid)

      // toast.success("Login successful!")
      router.push('/')

    } catch (error) {
      console.error("Login error", error.message)
      toast.error(error.message)
    }
  }

</script>

<style lang="scss">
  .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 768px) {
      width: 100%;
    }

    .login-register {
      margin-bottom: 32px;

      .router-link {
        color: #000;
      }
    }

    form {
      padding: 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      @media (min-width: 768px) {
        padding: 0 50px;
      }

      h2 {
        text-align: center;
        font-size: 32px;
        padding-bottom: 40px;
        color: #303030;
        @media (min-width: 768px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;
          input {
            width: 100%;
            border: none;
            background-color: #f2f2f2;
            padding: 4px 4px 4px 30px;
            height: 50px;

            &:focus {
              outline: none;
            }
          }
          .icon {
            width: 12px;
            position: absolute;
            left: 6px;
          }
        }
      }

      .forgot-password {
        text-decoration: none;
        color: #000;
        cursor: pointer;
        margin: 16px 0 32px;
        border-bottom: 1px solid transparent;
        transition:  0.5s ease all;

        &:hover {
          border-color: #303030;
        }
      }

      .angle {
        display: none;
        position: absolute;
        background-color: #fff;
        transform: rotateZ(3deg);
        width: 60px;
        right: -30px;
        height: 101%;
        @media (min-width: 768px) {
          display: initial;
        }
      }
    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url('../assets/background.png');
        width: 100%;
        height: 100%;
        @media (min-width: 768px) {
          display: initial;
        }
      }
  }
</style>
