const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LayoutComponent.vue"),
  },

  {
    path: "/consultar",
    component: () => import("src/components/BuscaComponent.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
