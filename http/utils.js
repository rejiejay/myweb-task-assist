import * as URL from 'url';

const reqToParameter = request => {
    const url = URL.parse(request.url, true)
    const params = new URLSearchParams(url.searchParams)
    for (const [name, value] of params) {
      console.log(name, value);
    }
    return {}
}

const utils = {
    reqToParameter
}

export default utils