class MainComponent extends React.Component {

    render() {
        return [
            <div className="caching flex-start">
                <div className="caching-container target-container flex-start flex-rest">
                    <div className="task-item flex-rest flex-center">范围: 所有</div>
                </div>
                <div className="caching-container doing-container flex-start flex-rest">
                    <div className="task-item flex-center flex-rest">执行此任务?</div>
                </div>
            </div>,

            <div className="todo">
                <div className="todo-container">
                    <div className="todo-title">标题</div>
                    <div className="todo-specific">具体任务内容</div>

                    <div className="todo-putoff flex-center">推迟的时间?</div>
                    <div className="todo-complete flex-center" >完成的时间?</div>

                    <div className="todo-operation flex-start-center">
                        <div className="todo-details-operation flex-rest flex-center" >任务详情?</div>
                        <div className="todo-conclusion-operation flex-rest flex-center" >显示结论/记录?</div>
                    </div>

                    <div className="todo-details">
                        <div className="todo-measure">衡量任务完成的标准?</div>
                        <div className="todo-span">长时间跨度下这任务的意义?</div>
                        <div className="todo-aspects">任务影响涉及到哪些方面?好处?</div>
                        <div className="todo-worth">任务的本质是为了什么?</div>
                        <div className="todo-time">是否必须完成?何时?</div>
                    </div>

                    <div className="todo-conclusions">任务结论</div>

                    <div className="todo-record-add flex-center" >新增结论/记录?</div>

                    <div className="todo-operation flex-start-center">
                        <div className="operation-item flex-rest flex-center" >完成?</div>
                        <input type="text" placeholder="YYYY-MM-DD hh:mm" />
                        <div className="operation-item flex-rest flex-center" >推迟?</div>
                        <div className="operation-item flex-rest flex-center" >编辑?</div>
                        <div className="operation-item flex-rest flex-center" >删除?</div>
                        <div className="operation-item flex-rest flex-center" >todo other?</div>
                    </div>
                </div>
            </div>,
            <div className="operation">
                <div className="operation-button">还有什么可以做?</div>
                <div className="dividing-line"></div>
                <div className="operation-button">为什么要做这个?</div>
                <div className="dividing-line"></div>
                <div className="operation-button">新增任务?</div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
