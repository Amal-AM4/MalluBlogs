<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="!navigation" />

      <router-view />

      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import Footer from './components/FooterBar.vue';
  import Navigation from './components/NavigationBar.vue';
  import { computed, onMounted, ref, watchEffect } from 'vue';
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useStore } from 'vuex';

  // reactive state
  const navigation = ref(false)
  const userUID = ref(null); // Store user UID

  const route = useRoute() // get the current route
  const routeName = computed(() => route.name) // access route name
  const store = useStore()

  // fn to check route and update navigation
  const checkRoute = () => {
    const hiddenRoutes = ["Login", "Register", "ForgotPassword"]
    navigation.value = hiddenRoutes.includes(routeName.value)
  }

  // Get current user on mount
  onMounted(() => {
    // this code monitor where someone is login or not or changed the accound
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      store.commit("updateUser", user)
      if (user) {
        userUID.value = user.uid; // Store user UID
        // console.log("User UID App.vue:", user);
        await store.dispatch("getCurrentUser")
        console.log("App.vue: ", store.state.profileEmail)
      } else {
        console.log("No user logged in.");
      }
    });
  });

  // watch route changes and update navigation dynamically
  watchEffect(checkRoute)

</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Quicksand", sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container {
    max-width: 1440px;
    margin: 0 auto;
  }

  .link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
  }

  .link-light {
    color: #fff;
  }

  .arrow {
    margin-left: 8px;
    width: 12px;
    fill: #000;
  }
  .arrow-light  {
    fill: #fff;
  }

  button,
  .router-button {
    transition: 500ms ease all;
    cursor: pointer;
    margin-top: 24px;
    padding: 12px 24px;
    background: #303030;
    color: #fff;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
    text-decoration: none;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .button-ghost {
    color: #000;
    padding: 0;
    border-radius: 0;
    margin-top: 50px;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;
    @media (min-width: 768px) {
      margin-top: 0;
      margin-left: auto;
    }

    i {
      margin-left: 8px;
    }
  }

  .button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }

  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
  }

  .blog-card-wrap {
    position: relative;
    padding: 80px 16px;
    background-color: #f1f1f1;
    @media (min-width: 425px){
      padding: 100px 16px;
    }

    .blog-cards {
      display: grid;
      gap: 32px;
      grid-template-columns: 1fr;

      @media (min-width: 425px){
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 768px){
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1024px){
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
</style>
