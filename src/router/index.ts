import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/register/:key',
      name: 'registerConfirm',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})
/*
router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (to.name === 'registerConfirm') {
    const api = import.meta.env.VITE_API_URL;
    const key = to.params.key //Get key from URL
    console.log(key)
    if (key) { //Verify if key exists
      axios.get(api+'/users/register/'+key)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    } 
    
    else { //If key not exists, redirect to home
      next({ name: 'home' })
    }
  }
  
  next()
})
*/

router.beforeEach((to, from, next) => {
  if (to.name === 'registerConfirm') {
    const api = import.meta.env.VITE_API_URL;
    const key = to.params.key //Get key from URL
    console.log(api+'/users/register/'+key)
    if (key) { //Verify if key exists
      // axios.get(api+'/users/register/'+key, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*"
      //   }
      // })
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err);
      // })

      fetch(api+'/users/register/'+key, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    } 

    else { //If key not exists, redirect to home
      next({ name: 'home' })
    }
  }

  next()
})

export default router
