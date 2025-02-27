
import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Your state variables here
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Feb 1 2025" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "Feb 1 2025" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Feb 1 2025" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Feb 1 2025" },
    ],
    editPost: null,
  },
  mutations: {
    // Your mutation functions here
    toggleEditPost(state, payload) {
      state.editPost = payload
    }
  },
  actions: {
    // Your action functions here
  },
  modules: {
    // Your modules here
  }
});

export default store;
