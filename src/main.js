import Vue from 'vue'
import App from './App'

//uview
import uView from "uview-ui";
//mock.js
import Mock from '@/common/js/mock';
//封装请求方法
import { apiResquest } from "@/common/js/api/request.js"
import { Utils } from "@/common/js/utils/utils.js"
import * as filters from '@/common/js/utils/filters.js'


//过滤器
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })

Vue.use(uView);
Vue.config.productionTip = false
//定义$apiResquest
Vue.prototype.apiResquest = apiResquest
Vue.prototype.utils = new Utils()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
