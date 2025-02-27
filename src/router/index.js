import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BlogsView from "@/views/BlogsView.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: BlogsView,
    meta: {
      title: 'Blogs',
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title ?? "Mallublog"} | MalluBlog`
  next()
})

export default router;
