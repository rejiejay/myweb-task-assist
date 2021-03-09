import HTTP from './module/http';

const init = async () => {
    console.log('开始渲染')
    // 页面Pro渲染
    await HTTP.renderWebResource()
}

init()
