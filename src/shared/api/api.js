import axios from 'axios';
import Cookie from 'js-cookie';

import goods from './goods';

const ExampleAPI = () => {
	const r = (url, extra={}) => {
		const headers = {
			// 'Content-Type': 'application/json',
			// 'Cache-Control': 'no-cache',
			// 'Pragma': 'no-cache',
			// 'Access-Control-Allow-Origin': '*'
		};
		const token = Cookie.get('token');
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}
		extra.headers = extra.headers || {};

		axios.defaults.baseURL = extra && extra.baseURL ? extra.baseURL : 'http://example.com';
		return new Promise((resolve, reject) => {
			axios({
				url,
				...extra,
				headers: {
					...headers,
					...extra.headers
				},
				timeout: 60000
			}).then(response => {
				console.log(response.data);
				resolve(response.data);
			}).catch(error => {
				reject(error);
			});
		});
	};

	return {
		goods: goods(r),

		request: r
	};
};

const api = ExampleAPI();

export default api;
export const request = api.request;
