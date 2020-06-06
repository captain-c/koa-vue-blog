axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建axios实例
var fetch = axios.create({
  timeout: 300000,     // 请求超时时间,单位毫秒
});

// request拦截器
fetch.interceptors.request.use(
	function(config) {
    // config.headers['x-client'] = 'pc';
    // config.headers['x-client-version'] = '3.9';
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
		return config;
	},
	function(err) {
		return Promise.reject(err);
	}
);

// respone拦截器
fetch.interceptors.response.use(
	function (response) {
		var res = response.data;
		if(res.code != 1) {
			return Promise.reject(res);
		}
		else {
			return res;
		}
	},

	function(error) {
		return Promise.reject(error)
	}
);

function apiRegister(data) {
  return fetch({
		url: '/api/v1/auth/register',
		method: 'post',
		data
	});
}

function apiLogin(data) {
  return fetch({
		url: '/api/v1/auth/login',
		method: 'post',
		data
	});
}