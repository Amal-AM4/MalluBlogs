<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">MalluBlogs</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobileNav" id="nav-links">
          <li><router-link class="link" to="/">Home</router-link></li>
          <li><router-link class="link" to="/blogs">Blogs</router-link></li>
          <li><router-link class="link" to="#">Create Post</router-link></li>
          <li><router-link class="link" to="#">Login/Register</router-link></li>
        </ul>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/blogs">Blogs</router-link></li>
        <li><router-link class="link" to="#">Create Post</router-link></li>
        <li><router-link class="link" to="#">Login/Register</router-link></li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import menuIcon  from '../assets/Icons/bars-regular.svg'

  const mobile = ref(false)
  const mobileNav = ref(false)
  const windowWidth = ref(false)

  // Function to check screen size
  const checkScreen = () => {

    windowWidth.value = window.innerWidth;
    mobile.value = windowWidth.value <= 768;
    if (!mobile.value) {
      mobileNav.value = false;
    }
  };

  // Toggle Mobile Navigation
  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
  };

  // Lifecycle Hooks
  onMounted(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen(); // Call on load
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreen);
  });
</script>

<style lang="scss" scoped>
  header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    z-index: 99;
  }

  .link {
    font-weight: 500;
    padding: 0 8px;
    display: inline-block;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        display: flex;
        list-style-type: none;

        .links {
          margin-right: 32px;
        }

        .links:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    list-style-type: none;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .mobile-nav-enter-to,
  .mobile-nav-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  @media only screen and (max-width: 768px) {
    nav ul li a {
      visibility: hidden;
    }
  }


</style>
