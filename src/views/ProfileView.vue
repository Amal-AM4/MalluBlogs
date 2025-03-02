<template>
  <div class="profile">
    <ModalComponent v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">FirstName:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">LastName:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" disabled />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalComponent from '@/components/ModalComponent.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import adminIcon from '../assets/Icons/user-crown-light.svg'
import { useRouter } from 'vue-router';

const router = useRouter()

const store = useStore()
const profileInitials = computed(() => store.state.profileInitials)

const profileFirstName = computed({
  get: () => store.state.profileFirstName,
  set: (payload) => store.commit("changeFirstName", payload)
});
const profileLastName = computed({
  get: () => store.state.profileLastName,
  set: (payload) => store.commit("changeLastName", payload)
});
const profileUsername = computed({
  get: () => store.state.profileUsername,
  set: (payload) => store.commit("changeUserName", payload)
});

const profileEmail = computed({
  get: () => store.state.profileEmail,
});

const firstName = profileFirstName
const lastName = profileLastName
const username = profileUsername
const email = profileEmail

const modalMessage = ref('Changes were saved!')
const modalActive = ref(false)

const closeModal = () => {
  modalActive.value = !modalActive.value
}

const updateProfile = () => {
  store.dispatch('updateUserSettings')
  modalActive.value = !modalActive.value
  router.push('/profile')
}

</script>

<style lang="scss">
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: var(--main-shadow);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: relative;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        font-size: 14px;
        color: #fff;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 768px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
