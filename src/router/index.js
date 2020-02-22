import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Carousel from '@/components/Carousel'
import TextScrolling from '@/components/TextScrolling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home 
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: Carousel
    },
    {
      path: '/text',
      name: 'textscrolling',
      component: TextScrolling
    }
  ]
})
