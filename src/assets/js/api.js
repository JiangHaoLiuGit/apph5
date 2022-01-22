 /*
 * @Description: message
 * @LastEditTime: 2019-10-30 15:49:55
 */
import axios from 'axios'
import qs from 'qs'
import deploy from './constant'
let ip = deploy.ip
axios.defaults.timeout = 120 * 1000; // 设置统一超时时间
axios.defaults.baseURL = ip // 设置统一ip
let pending = [] //声明一个数组用于存储每个请求的取消函数和axios标识
var cancelToken = axios.CancelToken;
let removePending = (config) => {
	for (let i in pending) {
		if (pending[i].url === config.url) { //在当前请求在数组中存在时执行取消函数
			pending[i].f(); //执行取消操作
		}
	}
}

// 添加请求拦截器
axios.interceptors.request.use(
	config => {
		removePending(config)
		config.cancelToken = new cancelToken(function (cancel) {
			pending.push({
				url: config.url,
				f: cancel
			})
		})
		return Promise.resolve(config);
	},
	error => {
		// 请求失败做的一些处理
		return Promise.reject(error)
	}
)

// // 添加响应拦截器
axios.interceptors.response.use(
	response => {
		removePending(response.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
		// 响应后可以做些事情
		return Promise.resolve(response)
	},
	error => {
		// 响应失败后可以做些事情
		return Promise.reject(error)
	}
)

// 商品详情
export const indexs = (param) => {
	return axios.post(`new_app.php?c=article&a=index`,qs.stringify(param))
}

// 文章详情
export const article_info = (param) => {
	return axios.post(`new_app.php?c=article&a=article_info`,qs.stringify(param))
}

// 二级列表
export const second_list = (param) => {
	return axios.post(`new_app.php?c=article&a=second_list`,qs.stringify(param))
}

//首页搜索
export const article_search = (param) => {
	return axios.post(`new_app.php?c=article&a=article_search`,qs.stringify(param))
}

//添加浏览记录
export const browsing_history = (param) => {
	return axios.post(`new_app.php?c=article&a=browsing_history`,qs.stringify(param))
}

//添加转发记录
export const transmit_history = (param) => {
	return axios.post(`new_app.php?c=article&a=transmit_history`,qs.stringify(param))
}


