import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BlogsView from "@/views/BlogsView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";

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
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: 'Login',
    }
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: {
      title: 'Register',
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
    }
  },
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
