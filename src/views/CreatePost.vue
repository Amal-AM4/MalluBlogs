<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" :previewURL="blogPhotoFileURL" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">

        <!-- Upload Image -->
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg">
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>

      <!-- Rich Text Editor -->
      <div class="editor">
        <vue-editor v-model="blogHTML" :editorOptions="editorSettings" />
      </div>

      <div class="blog-actions">
        <button @click="publishBlog">Publish Blog</button>
        <router-link to="#" class="router-button">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { VueEditor } from "vue3-editor";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";

// Quill editor settings
const editorSettings = ref({
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],  // Headings
      ["bold", "italic", "underline", "strike"],  // Basic text formatting
      [{ list: "ordered" }, { list: "bullet" }],  // Lists
      [{ script: "sub" }, { script: "super" }],  // Subscript/Superscript
      [{ indent: "-1" }, { indent: "+1" }],  // Indentation
      [{ align: [] }],  // Alignment options
      ["blockquote", "code-block"],  // Block elements
      [{ color: [] }, { background: [] }],  // Text and background colors
      [{ font: [] }],  // Font styles
      [{ size: ["small", false, "large", "huge"] }],  // Font sizes
      ["clean"],  // Remove formatting
    ],
  },
});


const store = useStore();
const error = ref(false);
const errorMsg = ref("");
const blogPhoto = ref(null);

const blogPhotoPreview = computed(() => store.state.blogPhotoPreview);
const blogPhotoFileURL = computed(() => store.state.blogPhotoFileURL || "");
const blogPhotoName = computed(() => store.state.blogPhotoName);

const blogTitle = computed({
  get: () => store.state.blogTitle,
  set: (payload) => store.commit('updateBlogTitle', payload)
});
const blogHTML = computed({
  get: () => store.state.blogHTML,
  set: (payload) => store.commit("newBlogPost", payload),
});

// **Handle File Selection**
const fileChange = () => {
  if (blogPhoto.value && blogPhoto.value.files.length > 0) {
    const file = blogPhoto.value.files[0]; // Get selected file
    const fileName = file.name;

    // Convert file to Data URL (for preview)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      store.commit("fileNameChange", fileName);
      store.commit("createFileURL", reader.result); // Save base64 URL
      localStorage.setItem("blogImage", reader.result); // Save locally
    };
  } else {
    console.error("No file selected.");
  }
};

// **Load Saved Image from localStorage**
const loadSavedImage = () => {
  const savedImage = localStorage.getItem("blogImage");
  if (savedImage) {
    store.commit("createFileURL", savedImage);
  }
};

// **Open Image Preview**
const openPreview = () => {
  store.commit("openPhotoPreview");
};

// **Publish Blog**
const publishBlog = () => {
  console.log("Blog Title:", blogTitle.value);
  console.log("Blog Content:", blogHTML.value);
  console.log("Blog Cover Image:", blogPhotoFileURL.value);
};

// **Load Image on Component Mount**
loadSavedImage();
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
