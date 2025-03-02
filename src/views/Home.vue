<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h2>View More Recent Blogs</h2>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Resgister for your free account today!</h2>
        <router-link class="router-button" to="/register">
          Register for MalluBlogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Arrow from "../assets/Icons/arrow-right-light.svg"
  import BlogCard from '@/components/BlogCard.vue';
  import BlogPost from '@/components/BlogPost.vue';

  import { computed, ref } from 'vue';
  import { useStore } from "vuex";

  // Get store instance
  const store = useStore();

  // Access vuex state
  const user = computed(() => store.state.user)
  const sampleBlogCards = computed(() => store.state.sampleBlogCards)

  const welcomeScreen = ref({
    title: "Welcome!",
    blogPost: "Weekly blg articles with all things programming inlcuding HTML, CSS, JS and more. Register today to never miss a post!",
    welcomeScreen: true,
    photo: "coding"
  })

  const sampleBlogPost = ref([
    {
      title: "This is a Filter Title!",
      blogHTML: "This is a filter blog post title!",
      blogCoverPhoto: "beautiful-stories",
    },
    {
      title: "This is a Filter Title2!",
      blogHTML: "This is a filter blog post title!",
      blogCoverPhoto: "designed-for-everyone",
    }
  ])

  defineOptions({
    name: "HomeView"
  })
</script>

<style lang="scss" scoped>
  .blog-card-wrap {
    font-weight: 300;
    font-size: 28px;
    // margin-bottom: 32px;
  }

  .updates {
    .container {
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 768px) {
        padding: 125px 25px;
        flex-direction: row;
      }

      .router-button {
        display: flex;
        font-size: 14px;
        @media (min-width: 768px) {
          margin-left: auto;
        }
      }

      h2 {
        font-weight: 300;
        font-size: 32px;
        max-width: 425px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        @media (min-width: 768px) {
          text-align: initial;
          font-size: 40px;
        }
      }
    }
  }
</style>
