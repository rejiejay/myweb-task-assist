import Button from './../../../components/button'
import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import consequencer from './../../../../utils/consequencer'
import Prompt from './../../../components/prompt'
import Confirm from './../../../components/confirm'

import service from './../service'
import utils from './../utils'

const props = {
    resolve: () => { },
    reject: () => { },
    defaultFilter: {
        longTerm: { id: null, title: '' }, // 长期的任务不进行多选
        tags: [
            // { id, name }
        ],
        minEffectTimestamp: null,
        maxEffectTimestamp: null,
        multipleStatus: [
            // library\consts\task.js -> status
        ],
        multiplePriority: [
            // library\consts\task.js -> priority
        ]
    }
}

export class NavigationLink extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSelectedMove: false,

            links: [
                // id: 2,
                // uniquelyIdentify: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
                // parentUniquelyIdentify: "root",
                // topic: "root2",
                // filterJson: "{"longTerm":{"id":1,"title":"务长期任务"}}",
                // children: []
            ]
        }
    }

    componentDidMount() {
        this.initAllNavigationLink()
    }

    initAllNavigationLink = async () => {
        const fetchInstance = await service.getAllNavigationLink()
        if (fetchInstance.result !== 1) return
        const links = fetchInstance.data

        this.setState({ links })
    }

    switchLinkElementHiden = uniquelyIdentify => {
        let links = JSON.parse(JSON.stringify(this.state.links))
        const mapperLinkElement = link => {
            if (link.uniquelyIdentify === uniquelyIdentify) link.isHideChildren = !link.isHideChildren

            link.children.map(mapperLinkElement)
            return link
        }

        this.setState({ links: links.map(mapperLinkElement) })
    }

    initFilterJson = filter => {
        const { tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, statusMultipleFilter, priorityMultipleFilter } = filter

        const longTerm = longTermFilter
        const tags = tagFilter
        const minEffectTimestamp = minEffectTimestampFilter
        const maxEffectTimestamp = maxEffectTimestampFilter
        const multipleStatus = statusMultipleFilter
        const multiplePriority = priorityMultipleFilter
        const filterJson = JSON.stringify({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority })

        return filterJson
    }

    addNavigationLink = async () => {
        const { defaultFilter } = this.props

        const promptInstance = await Prompt({ title: '请输入新增导航栏名字', placeholder: '请输入新增导航栏名字' })
        if (promptInstance.result !== 1) return
        const topic = promptInstance.data

        const isMultipleFilter = true
        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, defaultFilter)
        if (selectInstance.result !== 1) return
        const filterJson = this.initFilterJson(selectInstance.data)

        const addInstance = await service.addNavigationLink({ topic, filterJson })
        if (addInstance.result !== 1) return Confirm(addInstance.message)

        this.initAllNavigationLink()
    }

    editNavigationLink = async ({ id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson }) => {
        const promptInstance = await Prompt({ title: '请输入新增导航栏名字', placeholder: '请输入新增导航栏名字', defaultValue: topic })
        if (promptInstance.result !== 1) return
        topic = promptInstance.data

        const isMultipleFilter = true
        const filter = JSON.parse(filterJson)
        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, filter)
        if (selectInstance.result !== 1) return
        filterJson = this.initFilterJson(selectInstance.data)

        const addInstance = await service.editNavigationLink({ id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson })
        if (addInstance.result !== 1) return Confirm(addInstance.message)

        this.initAllNavigationLink()
    }

    selectedMoveHandle = async link => {
        const { isSelectedMove } = this.state
        const { topic } = link
        const moveConfirmInstance = await Confirm(`确定要移动到: "${topic}"?`)
        if (moveConfirmInstance.result !== 1) return

        const moveNavigationLinkInstance = await service.editNavigationLink({ ...isSelectedMove, parentUniquelyIdentify: link.uniquelyIdentify })
        if (moveNavigationLinkInstance.result !== 1) return Confirm(moveNavigationLinkInstance.message)

        this.setState({ isSelectedMove: false })
        this.initAllNavigationLink()
    }

    deleteLinkElement = async (id, topic) => {
        const deleteConfirmInstance = await Confirm(`确定要删除: "${topic}"?`)
        if (deleteConfirmInstance.result !== 1) return

        const deleteNavigationLinkInstance = await service.deleteNavigationLink(id)
        if (deleteNavigationLinkInstance.result !== 1) return Confirm(deleteNavigationLinkInstance.message)

        this.initAllNavigationLink()
    }

    renderLink = link => {
        const { isSelectedMove } = this.state
        const { id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson, isHideChildren } = link
        const children = []
        const BlowUp = () => <svg width="16" height="16" t="1586918632959" className="icon" viewBox="0 0 1024 1024" >
            <path d="M51.501176 1015.265882L8.734118 972.498824 349.063529 632.470588 391.529412 674.936471zM632.651294 349.003294L972.769882 8.914824l42.586353 42.586352L675.237647 391.619765z" fill="#3C22D3" p-id="916"></path>
            <path d="M1024 1024H682.164706v-60.235294H963.764706v-281.6h60.235294zM60.235294 341.835294H0V0h341.835294v60.235294H60.235294z" fill="#BF5BFF" p-id="917"></path>
            <path d="M1024 341.835294h-60.235294V60.235294h-281.6V0H1024zM341.835294 1024H0V682.164706h60.235294V963.764706h281.6z" fill="#3C22D3" p-id="918"></path>
        </svg>
        const Minify = () => <svg width="16" height="16" t="1586918802647" className="icon" viewBox="0 0 1024 1024" >
            <path d="M1023.715635 1023.715635H341.238545v-682.47709h186.259372v56.873091H398.111636v568.730908h568.730908v-568.730908h-186.259373v-56.873091H1023.715635z" fill="#3C22D3" p-id="1050"></path>
            <path d="M682.47709 682.47709h-186.259373v-56.873091H625.603999v-568.730908H56.873091v568.730908h186.259372v56.873091H0v-682.47709h682.47709z" fill="#BF5BFF" p-id="1051"></path>
        </svg>

        link.children.forEach(element => children.push(this.renderLink(element)))

        const isShowChildren = (() => {
            if (children.length <= 0) return false
            if (!!isSelectedMove) return true

            return !isHideChildren
        })()

        return <div className='link-item' key={uniquelyIdentify}>
            <div className='link-item-container flex-start-center'>

                <div className='flex-rest'>{topic}</div>

                {!!isSelectedMove && isSelectedMove.uniquelyIdentify !== uniquelyIdentify &&
                    <div className='link-operation-move'
                        onClick={() => this.selectedMoveHandle(link)}
                    >移动到此</div>
                }
                {!!isSelectedMove && isSelectedMove.uniquelyIdentify === uniquelyIdentify &&
                    <div className='link-operation-move'
                        style={{ color: '#fe4066' }}
                        onClick={() => this.setState({ isSelectedMove: false })}
                    >取消移动</div>
                }

                {!isSelectedMove && <>
                    <div className='link-splice-operation' onClick={() => this.selectNavigationLink(filterJson)} >选择</div>
                    <div className='link-splice-operation' onClick={() => this.setState({ isSelectedMove: link })} >移动</div>
                    <div className='link-splice-operation' onClick={() => this.editNavigationLink({ id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson })}>编辑</div>
                    {children.length === 0 && <div className='link-splice-operation'
                        onClick={() => this.deleteLinkElement(id, topic)}
                    >删除</div>}
                    {children.length > 0 && <div className='link-switch-operation'
                        onClick={() => this.switchLinkElementHiden(uniquelyIdentify)}
                    >
                        {isHideChildren ? <BlowUp /> : <Minify />}
                    </div>}
                </>}

            </div>

            {isShowChildren && <div className='link-item-children'>{children}</div>}
        </div>
    }

    selectNavigationLink = filterJson => {
        const { resolve } = this.props
        const { tags, longTerm, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = JSON.parse(filterJson)
        resolve(consequencer.success({ tags, longTerm, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }))
    }

    cancelRejectHandle = () => {
        const { reject } = this.props
        reject(consequencer.error('cancel'))
    }

    render() {
        const slef = this
        const { links, isSelectedMove } = this.state

        const LinkElements = () => links.reduce((accumulator, link) => {
            accumulator.push(slef.renderLink(link))
            return accumulator
        }, [])

        return <div className='navigation-link'>
            <div className='navigation-link-operation'>
                <Button onClick={this.addNavigationLink}>新增导航</Button>
            </div>

            <div className='navigation-link-elements'>
                {!!isSelectedMove &&
                    <div className='link-item'>
                        <div className='link-item-container flex-start-center'>

                            <div className='flex-rest'>root</div>
                            {isSelectedMove.parentUniquelyIdentify !== 'root' &&
                                <div className='link-operation-move'
                                    onClick={() => this.selectedMoveHandle({ topic: 'root', uniquelyIdentify: 'root' })}
                                >移动到此</div>
                            }
                        </div>

                        <div className='link-item-children'>
                            <LinkElements />
                        </div>
                    </div>
                }
                {!isSelectedMove && <LinkElements />}
            </div>

            <CommonlyBottomOperate
                rightElement={[{
                    cilckHandle: this.cancelRejectHandle,
                    element: '取消'
                }]}
            />
        </div>
    }
}

export default NavigationLink
