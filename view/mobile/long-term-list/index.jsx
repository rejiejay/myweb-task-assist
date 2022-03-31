import Confirm from './../../components/confirm';
import Prompt from './../../components/prompt';

import {
    getLongTermDetailById,
} from '../../service/long-term';

import {
    goTaskPreview,
} from '../redux/action/navigation';

import {
    getAllTaskByLongTermUnCategorized,
    getAllTaskByLongTermPrograms,
} from '../../service/task-list';

import {
    setTaskLongTermProgram
} from '../../service/task';

import {
    deleteLongProgramTerm,
    editLongTermProgram,
    setLongTermProgramToTop
} from '../../service/long-term';

import Container from './components/container';
import Header from './components/header';
import LongTermProgramSelect from './components/long-term-program-select';
import TermListItemCard, { EditIcon, TopIcon, DeleteIcon, RefreshIcon } from './components/term-list-item-card';

export class LongTermList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            unCategorizedList: [],
            selectLongTermProgramTaskId: '',
            isSelectLongTermProgram: false,
            longTermProgramList: [],
        }
    }

    componentDidMount() {
        this.initHandle()
    }

    initHandle = () => {
        const { taskLongTermViewId } = this.props;
        const self = this

        const initLongTermInformation = async () => {
            const result = await getLongTermDetailById(taskLongTermViewId);
            if (result instanceof Error || !result) {
                return;
            }

            self.setState({
                title: result.name,
            })
        }

        const initLongTermUnCategorized = async () => {
            const result = await getAllTaskByLongTermUnCategorized(taskLongTermViewId);
            if (result instanceof Error) {
                return;
            }

            self.setState({
                unCategorizedList: result,
            })
        }

        const initLongTermProgram = async () => {
            const result = await getAllTaskByLongTermPrograms(taskLongTermViewId);
            if (result instanceof Error) {
                return;
            }

            self.setState({
                longTermProgramList: result,
            })
        }

        initLongTermInformation();
        initLongTermUnCategorized();
        initLongTermProgram();
    }

    addLongTermDetailProgramHandle = async () => {
        const longTermDetailProgramInstance = await Prompt({
            title: '请输入长期任务分类',
            placeholder: '请输入长期任务分类',
        })
        if (longTermDetailProgramInstance.result !== 1) return
    }

    deleteLongTermDetailProgram = async (longTermProgramId) => {
        const confirmInstance = await Confirm('确定要删除长期任务分类吗?')
        if (confirmInstance.result !== 1) return
        const result = await deleteLongProgramTerm(longTermProgramId);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    editLongTermProgram = async (longTermProgramId, longTermProgramName) => {
        const longTermDetailProgramInstance = await Prompt({
            title: '请输入编辑长期任务分类',
            placeholder: '请输入编辑长期任务分类',
            defaultValue: longTermProgramName
        })
        if (longTermDetailProgramInstance.result !== 1) return
        const name = longTermDetailProgramInstance.data

        const result = await editLongTermProgram(longTermProgramId, name);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    setLongTermProgramToTopPositon = async (longTermProgramId) => {
        const result = await setLongTermProgramToTop(longTermProgramId);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    toLongTermItem = (item) => {
        const { dispatch } = this.props;

        goTaskPreview(item.id, dispatch)
    }

    editLongTermDetailProgramHandle = async item => {
        this.setState({
            selectLongTermProgramTaskId: item.id,
            isSelectLongTermProgram: true,
        })
    }

    selectLongTermProgramHandle = async (selectId) => {
        const { selectLongTermProgramTaskId } = this.state
        if (selectId === false) {
            return this.setState({
                selectLongTermProgramTaskId: '',
                isSelectLongTermProgram: false,
            })
        }
        const result = await setTaskLongTermProgram(selectLongTermProgramTaskId, selectId);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({
            selectLongTermProgramTaskId: '',
            isSelectLongTermProgram: false,
        }, this.initHandle)
    }

    render() {
        const {
            title,
            unCategorizedList,
            longTermProgramList,
            isSelectLongTermProgram,
        } = this.state

        return <Container
            HeaderComponent={
                <Header
                    title={title}
                    addLongTermDetailProgramHandle={this.addLongTermDetailProgramHandle}
                />
            }
            SelectLongTermProgramComponent={
                <LongTermProgramSelect
                    isSelectLongTermProgram={isSelectLongTermProgram}
                    longTermProgramList={longTermProgramList}
                    selectLongTermProgramHandle={this.selectLongTermProgramHandle}
                />
            }
            UnCategorizedItemComponent={
                <TermListItemCard
                    key='un-categorized-term'
                    title={`未分类 - ${unCategorizedList.length}`}
                    TitleIcon={<div className='term-item-icon flex-center'
                        onClick={this.initHandle}
                    ><RefreshIcon /></div>}
                    subItem={unCategorizedList}
                    subItemClick={(item) => this.toLongTermItem(item)}
                    editLongTermDetailProgramHandle={this.editLongTermDetailProgramHandle}
                />
            }
            CategorizedItemComponent={longTermProgramList.map((term, key) =>
                <TermListItemCard
                    key={`categorized-term-${key}`}
                    title={term.name}
                    TitleIcon={<>
                        <div className='term-item-icon term-item-delete flex-center'
                            onClick={() => this.deleteLongTermDetailProgram(term.id)}
                        ><DeleteIcon /></div>
                        <div className='term-item-icon term-item-edit flex-center'
                            onClick={() => this.editLongTermProgram(term.id, term.name)}
                        ><EditIcon /></div>
                        <div className='term-item-icon term-item-top flex-center'
                            onClick={() => this.setLongTermProgramToTopPositon(term.id)}
                        ><TopIcon /></div>
                    </>}
                    subItem={term.data}
                    subItemClick={(item) => this.toLongTermItem(item)}
                    editLongTermDetailProgramHandle={this.editLongTermDetailProgramHandle}
                />
            )}
        />
    }
}

const mapStateToProps = (state) => {
    const { global } = state

    return {
        taskLongTermViewId: global.taskLongTermViewId,
    }

}

export const LongTermListComponent = window.ReactRedux.connect(mapStateToProps)(LongTermList)
