<template>
  <div class="blog-card-warp">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toogle Editing Post</span>
        <input type="checkbox" v-model="editPost">
      </div>
      <div class="blog-cards-grid">
        <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import BlogCard from '@/components/BlogCard.vue';

  import { computed, onBeforeUnmount } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const sampleBlogCards = computed(() => store.state.sampleBlogCards)

  // computed property to get the state value
  const editPost = computed({
    get: () => store.state.editPost,
    set: (value) => store.commit('toggleEditPost', value) // Commit with payload
  })

  // Rest `editPost` when the component is unmounted or leave the view page
  onBeforeUnmount(() => {
    store.commit('toggleEditPost', false)
  })



</script>

<style lang="scss" scoped>

  .blog-cards {
    position: relative;

    .toggle-edit {
      display: flex;
      align-items: center;
      position: absolute;
      top: 20px; right: 0px;

      span {
        margin-right: 16px;
      }

      input[type="checkbox"] {
        position: relative;
        width: 80px;
        height: 30px;
        appearance: none; // Hides default checkbox
        -webkit-appearance: none;
        background: #ccc;
        outline: none;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.4s ease;
        box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1),
                    inset 0 2px 4px rgba(0, 0, 0, 0.06);

        &::before {
          content: "";
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          top: 2px;
          left: 3px;
          background-color: #fff;
          transition: transform 0.4s ease, background-color 0.4s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
                      0 2px 4px rgba(0, 0, 0, 0.06);
        }

        &:checked {
          background: #4CAF50; // Green background when checked
          &::before {
            transform: translateX(50px); // Moves the circle to the right
            background-color: #fff;
          }
        }
      }
    }
  }


  .blog-cards-grid {
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #cccccc62;
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


</style>
