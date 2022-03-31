import { loadPageVar } from './../../utils/url-helper';

import {
    getAllLongTermProgram,
    getLongTermDetailById,
    addLongTermProgram,
} from '../../service/long-term';

import {
    getTaskByLongTermUnCategorizedPagination,
    getTaskByLongTermProgramPagination,
} from '../../service/task-list';

import Container from './components/container';
import Header from './components/header';
import Preview from './components/preview';
import Classification from './components/classification';
import List from './components/list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            longTermName: '长期任务',

            data: [],
            pageNo: 1,
            count: 0,
            unClassifyCount: 0,

            longTermProgramList: [],

            /**
             * un-classify | withInProgram
             */
            classifySelected: 'un-classify',
        }

        this.id = ''
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const id = loadPageVar('id');

        if (!id) return
        this.id = id
        await this.initProgram()
        await this.initData()
    }

    initProgram = async () => {
        const { id } = this
        const longTermProgramList = await getAllLongTermProgram(id)
        if (longTermProgramList instanceof Error || !longTermProgramList) return
        const longTermDetail = await getLongTermDetailById(id)
        if (longTermDetail instanceof Error || !longTermDetail) return

        this.setState({ longTermProgramList, longTermName: longTermDetail.name })
    }

    initData = async () => {
        const self = this
        const { id } = this
        const {
            pageNo,
            classifySelected,
            longTermProgramList,
        } = this.state

        const initUnCategorized = async () => {
            const result = await getTaskByLongTermUnCategorizedPagination(id, pageNo, 9);
            if (result instanceof Error) return

            self.setState({
                data: result.list,
                unClassifyCount: result.count,
                count: result.count,
            })
        }

        const initWithInProgram = async () => {
            const result = await getTaskByLongTermProgramPagination(id, classifySelected, pageNo, 9);
            if (result instanceof Error) return

            self.setState({
                data: result.list,
                count: result.count,
                longTermProgramList: longTermProgramList.map(program => {
                    if (program.id === classifySelected) {
                        program.count = result.count
                    }

                    return program
                }),
            })
        }

        if (classifySelected === 'un-classify') {
            return await initUnCategorized()
        }

        await initWithInProgram()
    }

    clickItemHandle = task => this.refs.preview.initByTaskId(task.id)

    selectTermProgramHandle = program => {
        this.refs.preview.initByProgram(program)
        this.setState({ classifySelected: program.id }, this.initData)
    }

    addLongTermProgramHandle = async name => {
        const { id } = this
        const result = await addLongTermProgram(id, name)
        if (result instanceof Error) return
        this.initProgram()
    }

    render() {
        const {
            data,
            pageNo,
            count,
            longTermName,
            unClassifyCount,
            longTermProgramList,
            classifySelected,
        } = this.state

        return <Container
            HeaderComponent={<Header
                longTermName={longTermName}
                addLongTermProgram={this.addLongTermProgramHandle}
            />}
            ClassificationComponent={<Classification
                unClassifyCount={unClassifyCount}
                longTermProgramList={longTermProgramList}
                classifySelected={classifySelected}
                setClassifySelected={() => this.setState({ classifySelected: 'un-classify' }, this.initData)}
                selectTermProgram={this.selectTermProgramHandle}
            />}
            ListComponent={<List
                data={data}
                pageNo={pageNo}
                pageTotal={Math.ceil(count / 9)}
                clickItemHandle={this.clickItemHandle}
                pageNoChangeHandle={pageNo => this.setState({ pageNo }, this.initData)}
            />}
            PreviewComponent={<Preview
                ref='preview'
                initProgram={this.initProgram}
                longTermProgramList={longTermProgramList}
                initAll={this.init}
            />}
        />
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system');
    root.className = 'windows'
    ReactDOM.render(<WebComponent />, root)
}
