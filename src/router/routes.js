import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/AccountLogin"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "dashboard",
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
    component: () => import("../views/AccountRegister"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "dashboard",
          });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  // {
  //   path: "/forgot-password",
  //   name: "Forgot-password",
  //   component: () => import("../views/AccountForgotPassword"),
  //   meta: {
  //     beforeResolve(routeTo, routeFrom, next) {
  //       // If the user is already logged in
  //       if (store.getters["auth/loggedIn"]) {
  //         // Redirect to the home page instead
  //         next({
  //           name: "home",
  //         });
  //       } else {
  //         // Continue to the login page
  //         next();
  //       }
  //     },
  //   },
  // },
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
  // {
  //   path: "/verify-email",
  //   name: "verify-email",
  //   component: () => import("../views/AccountVerifyEmail"),
  // },
  // {
  //   path: "/onboarding",
  //   name: "onboarding",
  //   component: () => import("../views/AccountOnboarding"),
  //   meta: {
  //     authRequired: true,
  //   },
  // },
  {
    path: "/",
    name: "dashboard",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/Dashboard"),
  },
  {
    path: "/quotes",
    name: "quotes-list",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/QuotesList"),
  },
  {
    path: "/quotes/create",
    name: "quotes-create",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/QuotesCreate"),
  },
  {
    path: "/suppliers",
    name: "suppliers-list",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/SuppliersList"),
  },
  {
    path: "/products",
    name: "products-list",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/ProductsList"),
  },
];
