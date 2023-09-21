import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import { useCookiesStore } from '@/stores'

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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'registerConfirm') {
   
    const key = to.params.key //Get key from URL    
    if (key) { //Verify if key exists      
      axios.get('http://localhost:3333'+'/users/register/'+key)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.status);
        if(err.response.status == 400){
          return { name: 'home' }
        }
      })
    } 
  }

  next();
});

export {router};