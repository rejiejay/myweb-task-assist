import Confirm from './../../../../components/confirm';
import {
    deleteLongProgramTerm,
    setLongTermProgramToTop,
    editLongTermProgram,
} from '../../../../service/long-term';

export default class ProgramPreView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.containerHeight = clientHeight - 91;

        this.id = null
    }

    init = program => {
        this.setState({ name: program.name })
    }

    setProgramToTop = async () => {
        const { initProgram } = this.props;
        const { id } = this;
        const result = await setLongTermProgramToTop(id);
        if (result instanceof Error) return Confirm(result.message)
        initProgram()
    }

    saveProgramHandle = async () => {
        const { initProgram, program } = this.props;
        const { id } = this;
        const { name } = this.state

        if (name === program.name) return

        const result = await editLongTermProgram(id, name);
        if (result instanceof Error) return Confirm(result.message)

        initProgram()
    }

    deleteLongTermHandle = async () => {
        const confirmInstance = await Confirm('确定要删除任务分类吗?')
        if (confirmInstance.result !== 1) return
        const { initProgram, setPreviewTypeNil } = this.props;
        const { id } = this;

        const result = await deleteLongProgramTerm(id);
        if (result instanceof Error) return Confirm(result.message)

        initProgram()
        setPreviewTypeNil()
    }

    render() {
        const { containerHeight } = this
        const { name } = this.state

        return <>
            <div className="program-preview-header flex-start-center noselect">
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.setProgramToTop}
                >置顶</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.saveProgramHandle}
                >保存</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.deleteLongTermHandle}
                >删除</div>
            </div>
            <div className="program-preview"
                style={{ height: `${containerHeight}px` }}
            >
                <div className="program-preview-container">
                    <textarea
                        style={{ height: `${containerHeight - 31}px` }}
                        value={name}
                        onChange={({ target: { value } }) => this.setState({ name: value })}
                    />
                </div>
            </div>
        </>
    }
}
