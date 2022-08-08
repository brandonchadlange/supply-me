import Vue from "vue";
import VueRouter from "vue-router";
import AuthService from "../services/auth";

import VueMeta from "vue-meta";
import store from "@/state/store";

import routes from "./routes";

Vue.use(VueRouter);
Vue.use(VueMeta, {
  keyName: "page",
});

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  if (!authRequired) return next();

  console.log("before each", store.getters["auth/loggedIn"]);

  if (store.getters["auth/loggedIn"]) {
    const valid = await AuthService.validate();
    return valid ? next() : redirectToLogin();
  }

  redirectToLogin();

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-inner-declarations
  function redirectToLogin() {
    // Pass the original route to the login component
    next({
      name: "login",
      query: {
        redirectFrom: routeTo.fullPath,
      },
    });
  }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args);
              reject(new Error("Redirected"));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }
  next();
});

export default router;