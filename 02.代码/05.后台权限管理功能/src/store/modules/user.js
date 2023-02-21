import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,constantRoutes, asyncRoutes, anyRoutes } from '@/router'
import router from '@/router'

import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes,routeNames){
  /*
    接收实参个数:2个
      第一个实参:所有的异步路由组成的数组
        数据类型:Array<routeObj>

      第二个实参:路由别名组成的数组(当前用户能访问的路由的别名)
        数据类型:Array<string>
  
    目的:过滤异步路由,返回一个当前账号能够访问异步路由组成的数组

    返回值:当前账号能够访问异步路由组成的数组
      数据类型:Array<routeObj>
  */

  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{

    // obj.fn&&obj.fn()=>obj.fn?.()

    // if(routeObj.children&&routeObj.children.length){
    if(routeObj.children?.length){
      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
    }
    return routeNames.includes(routeObj.name);
  });

  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存储按钮级别权限相关数据
    buttons:[],

    // 用于存储路由级别权限相关数据
    // 内部存储的是当前帐号有资格访问的路由别名
    routeNames: [],

    // 这个数据不是权限管理的一部分,他是为了解决左侧动态列表显示BUG存在的
    // 会在该数组中,存放当前项目中能访问的所有路由对象
    menuList:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, data) => {
    const {buttons,routes} = data;
    state.buttons = buttons;
    state.routeNames = routes;
    
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes),routes);
    // console.log(newAsyncRoutes);
    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.menuList = [...constantRoutes,...newAsyncRoutes,...anyRoutes];
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

