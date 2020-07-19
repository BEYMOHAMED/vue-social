import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Users from '../components/Users.vue'
import UserInfo from '../components/UserInfo.vue'
import UserId from '../components/UserById.vue'
import FriendList from '../components/FriendList.vue'
import FriendRequest from '../components/FriendRequest.vue'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home/user/all',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/home/user/me',
    name: 'UserInfo',
    component: UserInfo,
    meta: { requiresAuth: true }
  },
  {
    path: '/home/user/:id(\\d+)',
    name: 'UserId',
    component: UserId,
    meta: { requiresAuth: true }
  },
  {
    path: '/home/user/friendship',
    name: 'FriendList',
    component: FriendList,
    meta: { requiresAuth: true }
  },
  {
    path: '/home/user/friendrequest',
    name: 'FriendRequest',
    component: FriendRequest,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.connected) {
      next({
        name: 'Login'
      })
    }else {
      next()
    }
  } else {
    next()
  }
})

export default router
