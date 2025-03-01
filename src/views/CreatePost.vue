<template>
  <div class="create-post">
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg">
          <button class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }">Preview Photo</button>
          <span>File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor v-model="blogHTML" useCustomImageHandler :editorOptions="editorSettings" />
        <!-- OR USE QuillEditor -->
        <!-- <QuillEditor v-model:content="blogHTML" contentType="html" /> -->
      </div>
      <div class="blog-actions">
        <button>Publish Blog</button>
        <router-link to="#" class="router-button">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Quill from "quill";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { VueEditor } from "vue3-editor";

window.Quill = Quill;

// Quill editor settings
const editorSettings = ref({
  modules: {
    // imageResize: {},
  },
});

const store = useStore();

// Reactive states
const error = ref(false);
const errorMsg = ref("");
const blogPhoto = ref(null);

const profileId = computed(() => store.state.profileId);
const blogPhotoFileURL = computed(() => store.state.blogPhotoFileURL || "");
const blogPhotoName = computed(() => store.state.blogPhotoName);

const blogTitle = computed({
  get: () => store.state.blogTitle,
  set: (payload) => store.commit('updateBlogTitle', payload)
});
const blogHTML = computed({
  get() {
    console.log(store.state.blogHTML)
    return store.state.blogHTML;
  },
  set(payload) {
    store.commit("newBlogPost", payload);
  },
});

</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 500ms ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    background-color: #303030;
    margin-bottom: 10px;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: .5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }


  }

  .blog-actions {
      margin-top: 32px;

      button {
        margin-right: 16px;
      }
    }
}
</style>
