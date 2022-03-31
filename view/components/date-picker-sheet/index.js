import loadScript from './../../utils/loadScript'
import TimeHelper from './../../../utils/time-helper'
import Confirm from './../confirm'
import configs from './../../configs'

const CONST = {
    options: {
        title : '请选择时间',
        beginYear: 2021,
        endYear: 2021,
        value: '2018-03-18', // 日期初始化的默认值，列如'2018-03-18'
    }
}

const DatePicker = options => new Promise(async(resolve, reject) => {
    if (!window.Rolldate) {
        const loaded = await loadScript(`${configs.libraryProfixUrl}lib/picka-date/rolldate.min.js`)
        if (loaded.result !== 1) {
            await Confirm(loaded.message)
            return reject(loaded)
        }
    }

    const title = (options && options.title) ? options.title : '请选择时间'
    const nowYear = new Date().getFullYear()
    const beginYear = (options && options.beginYear) ? options.beginYear : nowYear - 10
    const endYear = (options && options.endYear) ? options.endYear : nowYear + 10
    const nowTime = new Date().getTime();
    const id = `picka-date-${nowTime}`
    const defaultValue = (() => {
        let value = nowTime
        if (options && options.value) value = options.value

        try {
            return TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(value))
        } catch (error) {
            return TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date())
        }
    })()
    
    const div = document.createElement('input')
    div.setAttribute('id', id)
    div.setAttribute('type', 'text')
    div.setAttribute('style', 'display: none;')
    div.setAttribute('placeholder', title)
    div.readOnly = true
    document.body.appendChild(div)

    /**
     * Rolldate 3.1.2
     * Copyright 2018-2019
     * weijhfly https://github.com/weijhfly/rolldate
     * Licensed under MIT
     * Released on: aug 4, 2018
     */
    const datepicker = new Rolldate({
        el: `#${id}`,
        format: 'YYYY-MM-DD hh:mm',
        beginYear,
        endYear,
        lang: { title },
        value: defaultValue,
        confirm: date => {
            const timestamp = TimeHelper.transformers.YYYYmmDDhhMMToTimestamp(date)
            resolve(timestamp)
            setTimeout(() => {
                if (div && div.parentNode) document.body.removeChild(div)
                ReactDOM.unmountComponentAtNode(div);
            }, 1000)
        },
        cancel: () => {
            resolve(new Error('cancel'))
            setTimeout(() => {
                if (div && div.parentNode) document.body.removeChild(div)
                ReactDOM.unmountComponentAtNode(div);
            }, 1000)
        }
    })

    datepicker.show()
}).catch(error => error);

export default DatePicker
