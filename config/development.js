import auth from './auth.js'

const development = {
    auth: {
        ...auth,
        /** 因为web端同时也被使用到, 所以Hard Code */
        value: 'NKlG2t3Paq4mB3pUE-NKlG2t3Paq4mB3pUE-NKlG2t3Paq4mB3pUE-NKlG2t3Paq4mB3pUE-NKlG2t3Paq4mB3pUE' // 仅仅只为测试环境提供的权限值
    }
}

export default development
