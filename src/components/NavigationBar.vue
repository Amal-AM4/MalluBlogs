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
          <li><router-link class="link" to="/create-post">Create Post</router-link></li>
          <li><router-link v-if="!user" class="link" to="/login">Login/Register</router-link></li>
        </ul>
        <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
          <span>{{ profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>
              <div class="right">
                <p>{{ profileFirstName }} {{ profileLastName }}</p>
                <p>{{ profileUsername }}</p>
                <p>{{ profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="router-link" to="/profile">
                  <userIcon class="icon" />
                  <p>Profile</p>
                </router-link>
                <router-link class="router-link" to="/admin">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
                <div @click="logOut" class="router-link">
                  <signOutIcon class="icon" />
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/blogs">Blogs</router-link></li>
        <li><router-link class="link" to="/create-post">Create Post</router-link></li>
        <li><router-link v-if="!user" class="link" to="/login">Login/Register</router-link></li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import menuIcon  from '../assets/Icons/bars-regular.svg'
  import userIcon  from '../assets/Icons/user-alt-light.svg'
  import adminIcon  from '../assets/Icons/user-crown-light.svg'
  import signOutIcon  from '../assets/Icons/sign-out-alt-regular.svg'
  import { getAuth, signOut } from 'firebase/auth'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'


  const store = useStore()
  const router = useRouter()

  const profileInitials = computed(() => store.state.profileInitials);
  const profileFirstName = computed(() => store.state.profileFirstName);
  const profileLastName = computed(() => store.state.profileLastName);
  const profileUsername = computed(() => store.state.profileUsername);
  const profileEmail = computed(() => store.state.profileEmail);

  const profileMenu = ref(false)
  const profile = ref(null) // replaces this.$refs.profile

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

  const toggleProfileMenu = (e) => {
    if (e.target === profile.value) {
      profileMenu.value = !profileMenu.value
    }
  }

  // signout
  const logOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)

      // clear user state in vuex
      // store.commit("updateUser", null)

      console.log("User signed out successfully.")

      // redirect to homepage or login
      router.push('/')
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  }

  const user = computed(() => store.state.user)

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

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px; right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: var(--main-shadow);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px; height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .router-link {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px; height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
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
