import Storage from './../../components/storage'

const optionalHeaders = () => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
    /**
     * token 凭证 的作用
     * PS：只有1个地方存储凭证 “缓存池”
     * 简单判断：BE通过判断“缓存池”是否存在凭证，可以简单判断是否有效
     * PS：一个用户可以在 “缓存池”有很多凭证，也可以在 “缓存池”没有凭证
     * PS：通过 “缓存池”的凭证可以获取“数据库关联的用户信息”
     * 进阶判断：BE通过凭证查找是否存在“数据库关联的用户信息”，进而判断是否有效
     */
    const token = Storage.auth.getToken()
    /**
     * signature 的作用
     * 唯一作用是防止拿到 token 就能够直接登录, 因为 signature 是动态的, 所以会过期, 会过期的就不好校验
     */
    const signature = Storage.auth.getSignature()
    /**
     * uuid 的作用
     * 是用于区分不同设备, 因为授权时候会用到这个信息
     * 也可以起到迷惑作用，同时也迷惑自己、
     */
    const uuid = Storage.auth.getUUID()

    /**
     * headers 使用 token 的原因
     * 不用太复杂, 因为对安全性的影响不大
     */
    headers.append('token', token)
    headers.append('signature', signature)
    headers.append('uuid', uuid)

    return headers
}

export default optionalHeaders
