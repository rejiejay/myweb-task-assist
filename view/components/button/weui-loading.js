/**
 * WeUI Loading 参考 https://github.com/Tencent/weui/blob/master/dist/style/weui.css
 */

const WeuiLoading = ({ isDisabled }) => <span className="weui-primary-loading weui-primary-loading_transparent"
    style={{ color: isDisabled ? 'black' : '#FFFFFF' }}
>
    <i className="weui-primary-loading__dot" />
</span>

export default WeuiLoading
