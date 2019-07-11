const goods = (r) => {
	return {
		all: () => {
			return r('/goods', { method: 'get' });
		}
	};
};

export default goods;
