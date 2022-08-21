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

  if (store.getters["auth/loggedIn"]) {
    const valid = await AuthService.validate();

    if (valid.data) {
      return next();
    }
  }

  store.dispatch("auth/loggedOut");
  return next("/login");
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
