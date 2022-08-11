import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/account/login"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "home",
          });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/pages/account/register"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "home",
          });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/pages/account/forgot-password"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "home",
          });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        localStorage.removeItem("sm:token");
        store.dispatch("auth/loggedOut");

        next({
          name: "login",
        });
      },
    },
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: () => import("../views/pages/account/verify-email"),
  },
  {
    path: "/onboarding",
    name: "onboarding",
    component: () => import("../views/pages/account/onboarding"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/:project",
    name: "home",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/dashboard/index"),
  },
  {
    path: "/:project/suppliers",
    name: "suppliers",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/suppliers/index"),
  },
];
