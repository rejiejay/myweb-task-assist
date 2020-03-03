class MainComponent extends React.Component {


    render() {
        return [
            <div className="spiritual">
                <div className="spiritual-title">情绪觉察</div>
                <div className="spiritual-item">
                    <div className="item-container">深呼吸一口气，呼出是否顺畅?身体压力觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">预备伸懒腰，是否能够毫无压力完成此动作?身体疲惫觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">握拳，是否感觉充分发力?身体疲惫觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">闭上眼, 是否能集中“注意力”回忆起做了什么事?精神状态觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">闭上眼, 感受一下触摸是否能够刺激大脑?五官觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">闭上眼, 聆听一下声音，是否分辨清晰?五官觉察</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">“抖脚”是大脑皮层中枢神经的指令，表示困乏，用于抵消一部分疲劳。</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">不想做事，判断大脑在“逃避痛苦”？意志力消耗殆净</div>
                </div>

                <div className="spiritual-title">解决方案</div>
                <div className="spiritual-item">
                    <div className="item-container">闭眼按摩大脑；血液循环；</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">躺床冥想一件事，保持思维流畅；休息~</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">喝杯水，或洗个热水澡，促进血液循环；</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">适当补充糖分；蜂蜜</div>
                </div>
                <div className="spiritual-item">
                    <div className="item-container">倒立；呼吸新鲜空气；</div>
                </div>
            </div>,

            <div className="button">
                <div className="button-container">
                    <div className="button-item noselect"
                        onClick={() => window.location.href = './../../todo/index.html'}
                    >我要做什么?</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
