import db from '@/firebase/firebaseInit';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
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
    user: null,
    profileEmail: null,
    profileUsername: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    // Your mutation functions here
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) { // doc contains the docSnap.data()
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
      state.profileUsername = doc.data().username

      // console.log("Vuex State Updated:", state.profileEmail);
    },
    setProfileInitials(state) {
      const first = state.profileFirstName ? state.profileFirstName[0] : "";
      const last = state.profileLastName ? state.profileLastName[0] : "";
      state.profileInitials = (first + last).toUpperCase();
    },

  },
  actions: {
    // Your action functions here
    async getCurrentUser({ commit }) { // Accept user as a parameter
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("No user logged in");

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          commit("setProfileInfo", docSnap);
          commit("setProfileInitials");
          console.log("User data fetched:", docSnap.data());
          return docSnap.data(); // ✅ Return user data
        } else {
          console.log("No user data found in Firestore.");
          return null
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null
      }
    },
  },
  modules: {
    // Your modules here
  }
});

export default store;
