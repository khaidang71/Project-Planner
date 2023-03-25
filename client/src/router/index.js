import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue'
// import ContactBook from "@/views/ContactBook.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //   {
  //     path: "/",
  //     name: "contactbook",
  //     component: ContactBook,
  // },
  {
    path: '/projects',
    name: 'AddProject',
    component: () => import('@/views/AddProject.vue')
  },
  {
    path: '/projects/:id',
    name: 'EditProject',
    component: () => import('@/views/EditProject.vue'),
    props: true
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;