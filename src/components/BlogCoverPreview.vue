<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <close @click="closePreview" class="icon" />
      <img :src="blogCoverPhoto" alt="cover photo">
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import close from "../assets/Icons/times-circle-light.svg"
import { computed, ref } from "vue";

const store = useStore()
const blogPhotoFileURL = computed(() => store.state.blogPhotoFileURL)

const blogCoverPhoto = ref(blogPhotoFileURL)

const closePreview = () => {
  store.commit('openPhotoPreview')
}

</script>

<style lang="scss" scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.7);

    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      border-radius: 8px;
      width: 80%;
      padding: 40px 30px;
      background-color: #fff;
      box-shadow: var(--main-shadow);

      .icon {
        width: 24px;
        height: auto;
        cursor: pointer;
        font-size: 24px;
        position: absolute;
        // z-index: 101;
        top: 15px; right: 15px;
        color: #303030;
      }

      img {
        margin-top: 16px;
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: var(--main-shadow);
      }
    }
  }
</style>
