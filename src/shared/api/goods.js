const goods = (r) => {
	return {
		all: () => {
			return r('/public/goods.json', { method: 'get' });
		}
	};
};

export default goods;
