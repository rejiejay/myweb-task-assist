import TermListItemCard, { SwitchIcon, EditIcon, TopIcon, DeleteIcon } from './../../components/page/term-list-item-card';
import Confirm from './../../components/confirm';
import Prompt from './../../components/prompt';

import {
    goTaskPreview,
    goLongTermList,
} from '../redux/action/navigation';

import {
    getPreviewTaskByLongTermQuickRecall,
    getPreviewTaskByAllLongTerm,
} from '../../service/task-list';

import {
    addLongTerm,
    deleteLongTerm,
    editLongTerm,
    setLongTermToTop
} from '../../service/long-term';

import Container from './components/container';
import Header from './components/header';

export class LongTermSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            longTermCount: 0,
            longTermQuickRecallType: 'recently', // mostly
            recentlyViewLongTerm: [],
            mostlyViewLongTerm: [],
            longTermList: [],
        }
    }

    componentDidMount() {
        this.initHandle()
    }

    initHandle = () => {
        const self = this
        const initLongTermQuickRecall = async () => {
            const result = await getPreviewTaskByLongTermQuickRecall();
            if (result instanceof Error) {
                return;
            }

            self.setState({
                longTermCount: result.count,
                recentlyViewLongTerm: result.recently,
                mostlyViewLongTerm: result.mostly,
            })
        }
        const initLongTerQuickClassify = async () => {
            const result = await getPreviewTaskByAllLongTerm();
            if (result instanceof Error) {
                return;
            }

            self.setState({
                longTermList: result,
            })
        }

        initLongTermQuickRecall();
        initLongTerQuickClassify();
    }

    addLongTermHandle = async (name) => {
        const result = await addLongTerm(name);
        if (result instanceof Error) {
            return;
        }
        this.initHandle()
    }

    switchQuickRecallType = () => {
        const { longTermQuickRecallType } = this.state
        const newLongTermQuickRecallType = longTermQuickRecallType === 'recently' ? 'mostly' : 'recently'

        this.setState({ longTermQuickRecallType: newLongTermQuickRecallType })
    }
    /**
     * 1. to long term detail list page
     * 2. to pre-view page
     */
    toLongTermItem = (item) => {
        const { dispatch } = this.props;

        goLongTermList(item.longTermId, dispatch)
        goTaskPreview(item.id, dispatch)
    }

    deleteLongTermList = async (longTermParentId) => {
        const confirmInstance = await Confirm('确定要删除长期任务吗?')
        if (confirmInstance.result !== 1) {
            return
        }
        const result = await deleteLongTerm(longTermParentId);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    editLongTermList = async (longTermParentId, longTermName) => {
        const longTermInstance = await Prompt({
            title: '编辑长期任务名称',
            placeholder: '编辑长期任务名称',
            defaultValue: longTermName
        })
        if (longTermInstance.result !== 1) return
        const name = longTermInstance.data

        const result = await editLongTerm(longTermParentId, name);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    setLongTermListToTop = async (longTermParentId) => {
        const result = await setLongTermToTop(longTermParentId);
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.initHandle()
    }

    toLongTermList = (longTermParentId) => {
        const { dispatch } = this.props;

        goLongTermList(longTermParentId, dispatch)
    }

    render() {
        const {
            longTermCount,
            longTermQuickRecallType,
            recentlyViewLongTerm,
            mostlyViewLongTerm,
            longTermList,
        } = this.state

        return <Container
            HeaderComponent={
                <Header
                    addLongTermHandle={this.addLongTermHandle}
                />
            }
            QuickRecallComponent={
                <TermListItemCard
                    key='quick-recall-item'
                    title={`${longTermQuickRecallType === 'recently' ? '最近' : '最多'}浏览 - ${longTermCount}`}
                    titleClick={() => { }}
                    TitleIcon={<div className='term-item-icon term-item-switch flex-center'
                        onClick={this.switchQuickRecallType}
                    ><SwitchIcon /></div>}
                    subItem={longTermQuickRecallType === 'recently' ? recentlyViewLongTerm : mostlyViewLongTerm}
                    subItemClick={this.toLongTermItem}
                />
            }
            LongTermListComponent={longTermList.map((term, key) =>
                <TermListItemCard
                    key={`long-term-${key}`}
                    title={term.name}
                    TitleIcon={<>
                        <div className='term-item-icon term-item-delete flex-center'
                            onClick={() => this.deleteLongTermList(term.id)}
                        ><DeleteIcon /></div>
                        <div className='term-item-icon term-item-edit flex-center'
                            onClick={() => this.editLongTermList(term.id, term.name)}
                        ><EditIcon /></div>
                        <div className='term-item-icon term-item-top flex-center'
                            onClick={() => this.setLongTermListToTop(term.id)}
                        ><TopIcon /></div>
                    </>}
                    titleClick={() => this.toLongTermList(term.id)}
                    subItem={term.data}
                    subItemClick={this.toLongTermItem}
                />
            )}
        />
    }
}

const mapStateToProps = (state) => ({})

export const LongTermSelectComponent = window.ReactRedux.connect(mapStateToProps)(LongTermSelect)
