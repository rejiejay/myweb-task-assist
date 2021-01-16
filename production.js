/**
 * 开发环境
 * TODO:
 * 页面Pro渲染
 * Web代理
 * API接口
 */
import HTTP from './http';

const init = async () => {
    await HTTP.renderWebResource()
    HTTP.initPro()
}

init()
