import service from './../../../../service'
import FunctionHelper from './../../../../../utils/function-helper'
import Confirm from './../../../../components/confirm';

import {
    notesDataToContentInputList,
    contentInputListToNotesData
} from './data-conversion';
import Navigation from './navigation';
import Operate from './operate';
import Container from './container';
import ContentInputContainer from './content-input-container';

export default class NoteRecordEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            isEditDiff: false,
            contentInputList: new Array(5).fill('').map((i, k) => ({
                type: 'normal',
                id: `${new Date().getTime()}${k}`,
                value: '',
            })),
        }

        this.notesContent = '';
        this.notesTitle = '';
        this.verifyEditDiff = this.verifyEditDiffHandle();
    }

    componentDidMount() {
        this.initNotesRandom()
    }

    componentDidUpdate() {
        this.verifyEditDiff()
    }

    verifyEditDiffHandle = () => {
        const handle = () => {
            const { contentInputList, title } = this.state
            const { notesContent, notesTitle } = this
            const data = contentInputListToNotesData(contentInputList);
            let isEditDiff = false

            if (data !== notesContent) isEditDiff = true
            if (title !== notesTitle) isEditDiff = true

            this.setState({ isEditDiff })
        }
        return FunctionHelper.debounce(handle, 500);
    }

    async initRecordHandle(noteId) {
        const { taskId } = this.props
        const { isEditDiff } = this.state

        const isRoot = noteId === taskId
        if (isRoot) return

        if (isEditDiff) {
            const confirmInstance = await Confirm('你有数据未保存, 是否加载新数据?');
            if (confirmInstance.result !== 1) return
        }

        const fetchInstance = await service.notes.getNoteByTask(taskId)
        if (fetchInstance.result !== 1) return toast.show(fetchInstance.message);
        const data = fetchInstance.data;
        this.initNotesDateToState(data)
    }

    async initNotesRandom() {
        const { taskId } = this.props

        const fetchInstance = await service.notes.getNotesRandomByTask(taskId, 1)
        if (fetchInstance.result !== 1) return toast.show(fetchInstance.message);
        const list = fetchInstance.data;
        if (list <= 0) return
        const data = list[0];

        this.initNotesDateToState(data)
    }

    initNotesDateToState = data => {
        this.notesContent = data.content
        this.notesTitle = data.title
        this.setState({
            title: data.title,
            contentInputList: notesDataToContentInputList(data.content)
        })
    }

    setContentInputItemValue = (value, id) => {
        this.setState({
            contentInputList: this.state.contentInputList.map((item, key) => {
                if (item.id === id) {
                    return { ...item, value }
                }

                return item
            })
        })
    }

    setContentInputItemType = type => {
        const { contentInputList } = this.state
        const inputFocusField = this.refs.content.getInputFocusField()
        if (!inputFocusField) return
        const item = contentInputList.find(i => i.id === inputFocusField)
        if (!item) return

        this.refs.content.setInputFocusHandle(inputFocusField)
        this.setState({
            contentInputList: contentInputList.map((item, key) => {
                if (item.id === inputFocusField) {
                    return { ...item, type }
                }

                return item
            })
        })
    }

    setTitleHandle = title => this.setState({ title })

    setContentInputListHandle = (
        contentInputList,
        callbackHandle = () => { }
    ) => this.setState({ contentInputList }, callbackHandle)

    navigateHandle = nodeId => this.refs.content.scrollByNodeId(nodeId)

    render() {
        const { height, width } = this.props;
        const { title, contentInputList, isEditDiff } = this.state

        return <Container
            height={height}
            width={width}
            renderNavigation={<Navigation
                contentInputList={contentInputList}
                navigateHandle={this.navigateHandle}
            />}
            renderOperate={<Operate
                isEditDiff={isEditDiff}
                setContentInputItemType={this.setContentInputItemType}
            />}
            renderContent={<ContentInputContainer
                ref='content'
                title={title}
                contentInputList={contentInputList}
                setTitleHandle={this.setTitleHandle}
                setContentInputListHandle={this.setContentInputListHandle}
                setContentInputItemValue={this.setContentInputItemValue}
            />}
        />
    }
}
