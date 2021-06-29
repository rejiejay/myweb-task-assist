import loadScript from './../../utils/loadScript'
import consequencer from './../../../utils/consequencer'
import StringHelper from './../../../utils/string-helper'
import Confirm from './../confirm'

import configs from './../../configs'
import style from './style.js'

const CONSTS = {
    direction: {
        top: 'top',
        top: 'top-start',
        top: 'top-end',
        right: 'right',
        right_start: 'right-start',
        right_end: 'right-end',
        bottom: 'bottom',
        bottom_start: 'bottom-start',
        bottom_end: 'bottom-end',
        left: 'left',
        left_start: 'left-start',
        left_end: 'left-end',
        auto: 'auto',
        auto_start: 'auto-start',
        auto_end: 'auto-end',
    },

    options: {
        demo: [
            {
                value: 1,
                label: 'name'
            }
        ]
    }
}

const props = {
    options: CONSTS.options.demo,
    direction: CONSTS.direction.bottom_end,
    name: '',
    children: '',
    handle: () => { }
}

export default class DropDownSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.componentReferId = StringHelper.createRandomStr({ length: 10 })
        this.tippyInstance = null
        this.needUpdateTippy = true
    }

    componentDidUpdate(prevProps) {
        const { options } = this.props

        const isOptionsChange = () => {
            if (!prevProps) return true /** 含义：之前连props都没有 */
            if (!options || options.length <= 0) return false
            if (!prevProps.options) return true /** 含义：之前不存在值，现在存在值 */
            if (JSON.stringify(prevProps.options) === JSON.stringify(options)) return false
            return true
        }

        if (isOptionsChange()) {
            this.needUpdateTippy = true
        }
    }

    bindDropDownSelectOnclick() {
        const { tippyInstance } = this
        const { options, handle } = this.props
        const tooltip_node = document.getElementById('drop-down-select-tooltip')
        const children_dom = tooltip_node.querySelectorAll('.tooltip-select-item')

        for (let index = 0; index < children_dom.length; index++) {
            const element = children_dom[index];
            const targetItem = options[index];
            element.onclick = () => {
                handle && handle(targetItem);
                tippyInstance[0].hide()
            }
        }
    }

    loadTippy = async () => {
        if (!window.tippy) {
            const loadPopper = await loadScript(`${configs.libraryProfixUrl}lib/tippy/popper.min.js`)
            if (loadPopper.result !== 1) return loadPopper
            const loadTippy = await loadScript(`${configs.libraryProfixUrl}lib/tippy/tippy-bundle.umd.min.js`)
            if (loadTippy.result !== 1) return loadTippy
        }

        return consequencer.success()
    }

    showDropDownSelectTippy = async () => {
        const { zIndex } = this.props
        const loaded = await this.loadTippy()
        if (loaded.result !== 1) {
            return await Confirm(loaded.message)
        }

        const self = this
        const { options, direction } = this.props
        const { componentReferId, needUpdateTippy } = this

        if (!options || options.length <= 0) return

        const node = document.createElement("div");
        node.setAttribute('class', 'drop-down-select-tooltip');
        node.setAttribute('id', 'drop-down-select-tooltip');

        ReactDOM.render(
            <div className='tooltip-select-container'
                style={style.tooltip}
            >{options.map(({ value, label }, key) =>
                <div key={key} className='tooltip-select-item flex-start-center' style={style.item}>
                    {label}
                </div>
            )}</div>
            ,
            node
        )

        if (!this.tippyInstance || needUpdateTippy) {
            this.tippyInstance = tippy(`#tippy${componentReferId}`, {
                content: node,
                allowHTML: true,
                interactive: true,
                trigger: 'click',
                hideOnClick: 'toggle',
                zIndex: zIndex || 1,
                placement: direction ? direction : CONSTS.direction.bottom_end,
                onShown(instance) {
                    self.bindDropDownSelectOnclick()
                }
            })
            this.needUpdateTippy = false
            this.tippyInstance[0].show()
        }
    }

    render() {
        const { componentReferId } = this
        const { name, children, containerStyle } = this.props

        return (
            <div className="drop-down-select-component flex-center"
                style={containerStyle || style.container}
                id={`tippy${componentReferId}`}
                onClick={this.showDropDownSelectTippy}
            >{children ? children : name}</div>
        )
    }
}
