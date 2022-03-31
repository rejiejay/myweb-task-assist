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

function dateToDiaryDetail(renderDate) {
    const CNDateString = {
        '0': '零',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九',
        '10': '十',
        '11': '十一',
        '12': '十二',
    }
    var yyyy = renderDate.getFullYear();

    var mm = renderDate.getMonth() + 1;
    var mmstring = mm < 10 ? '0' + mm : mm;

    var dd = renderDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    var hh = renderDate.getHours();
    var hhstring = hh < 10 ? '0' + hh : hh;

    var minutes = renderDate.getMinutes();
    var minutesstring = minutes < 10 ? '0' + minutes : minutes;

    const weekDate = renderDate.getDate()
    let weekMonth = 0
    if (weekDate <= 7) {
        weekMonth = 1
    } else if (weekDate <= 14) {
        weekMonth = 2
    } else if (weekDate <= 21) {
        weekMonth = 3
    } else {
        weekMonth = 4
    }

    let season = ''
    if (mm <= 3) {
        season = '春'
    } else if (mm <= 6) {
        season = '夏'
    } else if (mm <= 9) {
        season = '秋'
    } else {
        season = '冬'
    }

    let weekDay = renderDate.getDay()
    if (weekDay === 0) {
        weekDay = '日'
    } else {
        weekDay = CNDateString[weekDay]
    }

    return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:${minutesstring} | ${CNDateString[mm]}月${season} [第${CNDateString[weekMonth]}周] <星期${weekDay}> ${yyyy - 2000}年`;
}

function dateToTaskDetail(renderDate) {
    const CNDateString = {
        '0': '零',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九',
        '10': '十',
        '11': '十一',
        '12': '十二',
    }
    var yy = renderDate.getFullYear() - 2000;

    var mm = renderDate.getMonth() + 1;

    var dd = renderDate.getDate();
    var ddstring = dd < 10 ? '0' + dd : dd;

    const weekDate = renderDate.getDate()
    let weekMonth = 0
    if (weekDate <= 7) {
        weekMonth = 1
    } else if (weekDate <= 14) {
        weekMonth = 2
    } else if (weekDate <= 21) {
        weekMonth = 3
    } else {
        weekMonth = 4
    }

    let season = ''
    if (mm <= 3) {
        season = '春'
    } else if (mm <= 6) {
        season = '夏'
    } else if (mm <= 9) {
        season = '秋'
    } else {
        season = '冬'
    }

    let weekDay = renderDate.getDay()
    if (weekDay === 0) {
        weekDay = '日'
    } else {
        weekDay = CNDateString[weekDay]
    }

    return `${yy}年${CNDateString[mm]}月${ddstring}${season}[第${CNDateString[weekMonth]}周${weekDay}]`;
}

const timeTransformers = {
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
    YYYYmmDDToTimestamp,
    /**
     * Date 转换 xx年 xx月 季 [第x周] <星期x> xxxx-xx-xx xx:xx
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08
     */
    dateToDiaryDetail,
    /**
     * Date 转换 xx年xx月day季[第x周星期x]
     * @param {Date} myDate 要转换的日期
     * @return {string} 日期字符串 2018-05-08
     */
    dateToTaskDetail,
}

export default timeTransformers