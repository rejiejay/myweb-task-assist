import fetch from './fetch.js';
import toast from './toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './input-popup.js';

import consequencer from './../utils/consequencer.js';

const showLogInput = async () => {
    const handle = await inputPopUp({
        title: '请输入登录密码?',
        mustInput: true
    })

    if (handle.result !== 1) return

    fetch.get({
        url: 'user/login',
        query: {
            name: 'rejiejay',
            password: handle.data
        }
    }).then(res => {
        var token = res.data

        localStorage.setItem('rejiejay-task-assist-token', token)
        localStorage.setItem('rejiejay-task-assist-password', handle.data)
        inputPopUpDestroy()
        toast.show('登录成功！')
    }, error => console.error(error))

}

const init = async () => new Promise(function (resolve, reject) {
    let token = localStorage.getItem('rejiejay-task-assist-token')
    let password = localStorage.getItem('rejiejay-task-assist-password')

    if (!token || !password) {
        reject()
        return showLogInput()
    }

    fetch.get({
        url: 'user/verify',
        query: {
            verify: token
        },
        hiddenError: true
    }).then(
        res => {
            resolve()
            var token = res.data
            localStorage.setItem('rejiejay-task-assist-token', token)
        },
        error => {
            reject()
            showLogInput()
        }
    )

}).then(
    () => consequencer.success(),
    error => consequencer.error(error)
)

export default init