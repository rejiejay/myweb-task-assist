import loadScript from './../../utils/loadScript'
import consequencer from './../../../utils/consequencer'
import TimeHelper from './../../../utils/time-helper'
import Confirm from './../confirm'
import configs from './../../configs'

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

    const div = document.createElement('input')
    div.setAttribute('id', 'picka-date')
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
        el: '#picka-date',
        format: 'YYYY-MM-DD hh:mm',
        beginYear,
        endYear,
        lang: { title },
        confirm: date => {
            const timestamp = TimeHelper.transformers.YYYYmmDDhhMMToTimestamp(date)
            setTimeout(() => {
                document.body.removeChild(div)
                resolve(consequencer.success(timestamp))
            }, 1000)
        },
        cancel: () => {
            setTimeout(() => {
                document.body.removeChild(div)
                resolve(consequencer.error('cancel', 2))
            }, 1000)
        }
    })

    datepicker.show()
}).catch(error => error);

export default DatePicker
