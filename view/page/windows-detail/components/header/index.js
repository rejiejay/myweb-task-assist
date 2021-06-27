import toast from './../../../../components/toast';
import Modal from './../../../../components/modal';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    selectCategoryTag = () => {
        toast.show()
        import('./../../category-tag/index.js').then(async ({ TaskCategoryTag }) => {
            toast.destroy()

            const taskCategoryTag = new Modal(TaskCategoryTag);
            const result = await taskCategoryTag.show();

            if (result instanceof Error) return

            console.log('result', result)
        })
    }

    render() {
        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center flex-rest">
                <div className="operat-item hover-item"
                    onClick={this.selectCategoryTag}
                >标签分类</div>
                <div className="operat-item hover-item">优先级</div>
            </div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item">新增计划</div>
            </div>
        </div>
    }
}
