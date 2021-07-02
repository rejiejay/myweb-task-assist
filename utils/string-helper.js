import NumberHelper from './number-helper'

/**
 * 含义: 根据length大小生成随机字符串
 */
const createRandomStr = ({ length, excludeUpperCase }) => {
    let resultStr = '';
    let stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    if (!excludeUpperCase) stringArray = stringArray.concat(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])

    for (let i = 0; i < length; i++) {
        let index = NumberHelper.createRandomNum(stringArray.length - 1); // 随机下标
        resultStr += stringArray[index]; // 赋值进去
    }

    return resultStr;
}

const stringEncodeBase64 = string => btoa(encodeURI(string));

const base64DecodeString = base64 => decodeURI(atob(base64));

const StringHelper = {
    createRandomStr,
    stringEncodeBase64,
    base64DecodeString
}

export default StringHelper
