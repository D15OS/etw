import Vue from 'vue'
import App from './App'

//uview
import uView from "uview-ui";
//mock.js
import Mock from './common/js/mock';
//封装请求方法
import { apiResquest } from "./common/js/api/request.js"



Vue.use(uView);
Vue.config.productionTip = false
//定义$apiResquest
Vue.prototype.apiResquest = apiResquest

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
