class MainComponent extends React.Component {


    render() {
        return (<div class="reason-eidt flex-column-center">
            <textarea class="reason-textarea fiex-rest" type="text" placeholder="请输入理由"></textarea>

            <div class="reason-operating flex-start">
                <div class="operating-sticky-reason flex-rest flex-center">顶置理由</div>
                <div class="operating-unpin-reason flex-rest flex-center">取消置顶</div>
                <div class="operating-confirm flex-rest flex-center">确认</div>
                <div class="operating-del flex-rest flex-center">删除/取消</div>
            </div>
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
