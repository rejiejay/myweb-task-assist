export default class Operate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { isEditDiff, setContentInputItemType } = this.props;

        return <>
            <div className="left-operating flex-start-center flex-rest">
                <div className="operat-item hover-item"
                    onClick={() => setContentInputItemType('normal')}
                >内容</div>
                <div className="operat-item hover-item"
                    onClick={() => setContentInputItemType('h1')}
                >标题1</div>
                <div className="operat-item hover-item"
                    onClick={() => setContentInputItemType('h2')}
                >标题2</div>
                <div className="operat-item hover-item"
                    onClick={() => setContentInputItemType('h3')}
                >标题3</div>
                <div className="operat-item hover-item"
                    onClick={() => setContentInputItemType('h4')}
                >标题4</div>
            </div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item">取消分类</div>
                <div className="operat-item hover-item">移动</div>
                <div className="operat-item hover-item">删除</div>
                {isEditDiff &&
                    <div className="operat-item hover-item">暂存</div>
                }
            </div>
        </>
    }
}
