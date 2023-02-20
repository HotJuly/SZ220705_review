import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '@/components/About'
import Home from '@/components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{
                showHeader:true
            }
        },
        {
            path:'/about',
            component:About
        },
    ]
})