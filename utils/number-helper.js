/**
 * 含义: 根据 size 大小生成随机数字
 */
 const createRandomNum = (size = 100) => Math.round(Math.random() * size);

 const NumberHelper = {
     createRandomNum
 }
 
 export default NumberHelper