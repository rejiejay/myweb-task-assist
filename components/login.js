import fetch from './async-fetch/fetch.js';
import toast from './toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './input-popup.js';

const showLogInput = () => new Promise((resolve, reject) => {
    const inputHandle = password => {
        fetch.get({
            url: 'user/login',
            query: {
                name: 'rejiejay',
                password: password
            }
        }).then(res => {
            const token = res.data

            localStorage.setItem('rejiejay-task-assist-token', token)
            localStorage.setItem('rejiejay-task-assist-password', password)
            inputPopUpDestroy()
            toast.show('登录成功！')
            resolve()
        }, error => reject(error))
    }

    const defaultValue = localStorage.getItem('rejiejay-task-assist-password')

    inputPopUp({
        title: '请输入登录密码?',
        inputHandle,
        mustInput: true,
        defaultValue
    })
})

const init = async () => {
    let token = localStorage.getItem('rejiejay-task-assist-token')
    let password = localStorage.getItem('rejiejay-task-assist-password')

    if (!token || !password) {
        return showLogInput()
    }

    await fetch.get({
        url: 'user/verify',
        query: {
            verify: token
        },
        hiddenError: true
    }).then(
        ({
            data
        }) => localStorage.setItem('rejiejay-task-assist-token', data),
        error => showLogInput()
    )
}

export default init