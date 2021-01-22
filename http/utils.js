import * as URL from 'url';

const reqToParameter = request => {
	let parameter = {}
	const url = URL.parse(request.url, true)
	const params = new URLSearchParams(url.search)
	for (const [name, value] of params) {
		parameter[name] = value
	}
	return parameter
}

const utils = {
	reqToParameter
}

export default utils