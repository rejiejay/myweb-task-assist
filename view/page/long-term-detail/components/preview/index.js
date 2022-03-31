import TaskPreView from './task';
import ProgramPreView from './program';

import { getTaskDetail } from '../../../../service/task';

export default class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            previewType: '', // program task
        }
    }

    initByTaskId = async id => {
        const result = await getTaskDetail(id)
        if (result instanceof Error || !result) return
        this.setState(
            { previewType: 'task' },
            () => this.refs.taskPreView.init(result)
        )
    }

    initByProgram = async program => {
        this.setState(
            { previewType: 'program' },
            () => this.refs.programPreView.init(program)
        )
    }

    render() {
        const {
            task,
            previewType,
        } = this.state
        const { initProgram, longTermProgramList, initAll } = this.props

        if (previewType === 'program') {
            return <ProgramPreView
                ref='programPreView'
                initProgram={initProgram}
                setPreviewTypeNil={() => this.setState({ previewType: '', program: null })}
            />
        }

        if (previewType === 'task') {
            return <TaskPreView
                ref='taskPreView'
                task={task}
                longTermProgramList={longTermProgramList}
                initAll={initAll}
            />
        }

        return <></>
    }
}
