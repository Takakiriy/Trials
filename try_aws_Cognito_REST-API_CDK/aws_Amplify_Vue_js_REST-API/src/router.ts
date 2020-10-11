import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignInSignUp from './views/SignInSignUp.vue';
import SignOut from './views/SignOut.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInSignUp,
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignOut,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
