const minutTimestamp = 1000 * 60
const hourTimestamp = minutTimestamp * 60
const dayTimestamp = hourTimestamp * 24
const monthTimestamp = dayTimestamp * 30
const yearTimestamp = dayTimestamp * 365 

function dateToFormat(myDate) {
    var yyyy = myDate.getFullYear();

    var mm = myDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = myDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    return `${yyyy}-${mmstring}-${ddstring}`;
}

function dateToYYYYmmNumber(myDate) {
    var yyyy = myDate.getFullYear();

    var mm = myDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = myDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    return `${yyyy}${mmstring}${ddstring}`;
}

function dateToYYYYmmDDhhMM00(myDate) {
    var yyyy = myDate.getFullYear();

    var mm = myDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = myDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    var hh = myDate.getHours();
    var hhstring = hh < 10 ? '0' + hh : hh;

    return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:00`;
}

function dateToYYYYmmDDhhMM(myDate) {
    var yyyy = myDate.getFullYear();

    var mm = myDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = myDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    var hh = myDate.getHours();
    var hhstring = hh < 10 ? '0' + hh : hh;

    var Min = myDate.getMinutes();
    var Minstring = Min < 10 ? '0' + Min : Min;

    return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:${Minstring}`;
}

function dateToYYYYmmDDhhMMss(myDate) {
    var yyyy = myDate.getFullYear();

    var mm = myDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = myDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    var hh = myDate.getHours();
    var hhstring = hh < 10 ? '0' + hh : hh;

    var Min = myDate.getMinutes();
    var Minstring = Min < 10 ? '0' + Min : Min;

    var ss = myDate.getSeconds();
    var ssstring = ss < 10 ? '0' + ss : ss;

    return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:${Minstring}:${ssstring}`;
}

function dateToMMssMilliseconds(myDate) {
    var hh = myDate.getHours();
    var hhstring = hh < 10 ? '0' + hh : hh;

    var Min = myDate.getMinutes();
    var Minstring = Min < 10 ? '0' + Min : Min;

    var ss = myDate.getSeconds();
    var ssstring = ss < 10 ? '0' + ss : ss;

    var milliseconds = myDate.getMilliseconds();

    return `${hhstring}:${Minstring}:${ssstring}:${milliseconds}`;
}

function YYYYmmDDhhMMssToTimestamp(YYYYmmDDhhMMss) {
    var YDArray = YYYYmmDDhhMMss.split(' ');
    var YYYYmmDDarray = YDArray[0].split('-');
    var hhMMssArray = YDArray[1].split(':');
    return new Date(YYYYmmDDarray[0], (YYYYmmDDarray[1] - 1), YYYYmmDDarray[2], hhMMssArray[0], hhMMssArray[1], hhMMssArray[2]).getTime();
}

function YYYYmmDDhhMMToTimestamp(YYYYmmDDhhMM) {
    var YDArray = YYYYmmDDhhMM.split(' ');
    var YYYYmmDDarray = YDArray[0].split('-');
    var hhMMssArray = YDArray[1].split(':');
    return new Date(YYYYmmDDarray[0], (YYYYmmDDarray[1] - 1), YYYYmmDDarray[2], hhMMssArray[0], hhMMssArray[1]).getTime();
}

function YYYYmmDDToTimestamp(YYYYmmDD) {
    var YDArray = YYYYmmDD.split(' ');
    var YYYYmmDDarray = YDArray[0].split('-');

    return new Date(YYYYmmDDarray[0], (YYYYmmDDarray[1] - 1), YYYYmmDDarray[2]).getTime();
}

const transformers = {
    /**
     * Date 转换 xxxx-xx-xx 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08
     */
    dateToFormat,
    /**
     * Date 转换 20180102 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 20180102
     */
    dateToYYYYmmNumber,
    /**
     * Date 转换 xxxx-xx-xx xx:00 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08 09:00
     */
    dateToYYYYmmDDhhMM00,
    /**
     * Date 转换 xxxx-xx-xx xx:xx 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08 09:15
     */
    dateToYYYYmmDDhhMM,
    /**
     * Date 转换 xxxx-xx-xx xx:xx:xx 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08 09:15:30
     */
    dateToYYYYmmDDhhMMss,
    /**
     * Date 转换 xx:xx:xx:xxx 字符串
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 09:15:30:195
     */
    dateToMMssMilliseconds,
    /**
     * xxxx-xx-xx xx:xx:xx 字符串 转换 为时间戳
     * @param {string} YYYYmmDDhhMMss xxxx-xx-xx xx:xx:xx 字符串
     * @return {number} 为时间戳 1539051630549
     */
    YYYYmmDDhhMMssToTimestamp,
    /**
     * xxxx-xx-xx xx:xx 字符串 转换 为时间戳
     * @param {string} YYYYmmDDhhMM xxxx-xx-xx xx:xx 字符串
     * @return {number} 为时间戳 1539051630549
     */
    YYYYmmDDhhMMToTimestamp,
    /**
     * xxxx-xx-xx字符串 转换 为时间戳
     * @param {string} YYYYmmDD xxxx-xx-xx 字符串
     * @return {number} 为时间戳 1539051630549
     */
    YYYYmmDDToTimestamp
}

const TimeHelper = {
    minutTimestamp,
    hourTimestamp,
    dayTimestamp,
    monthTimestamp,
    yearTimestamp,
    transformers
}

export default TimeHelper
