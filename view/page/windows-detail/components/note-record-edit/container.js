export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.isFixed = false;
    }

    componentDidMount() {
        window.document.addEventListener('scroll', this.scrollEventListener)
    }

    componentWillUnmount() {
        window.document.removeEventListener('scroll', this.scrollEventListener)
    }

    scrollEventListener = e => {
        const container = this.refs['note-record-edit'];
        const navigation = this.refs['record-edit-navigation'];
        const header = this.refs['edit-content-header'];
        const input = this.refs['edit-content-input'];

        if (!container || !navigation || !header || !input) return

        const offsetTop = container.offsetTop
        const scrollheight = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;

        if (scrollheight > offsetTop) {
            if (this.isFixed) return
            this.isFixed = true
            navigation.className = 'record-edit-navigation noselect edit-navigation-fixed'
            header.className = 'edit-content-header flex-start-center noselect edit-header-fixed'
            input.className = 'edit-content-input edit-input-fixed'
            return
        };

        if (!this.isFixed) return
        navigation.className = 'record-edit-navigation noselect'
        header.className = 'edit-content-header flex-start-center noselect'
        input.className = 'edit-content-input'
        this.isFixed = false
    }

    render() {
        const {
            height,
            width,
            renderNavigation,
            renderOperate,
            renderContent
        } = this.props;

        return <div className='note-record-edit flex-start'
            ref="note-record-edit"
            style={{
                minHeight: `${height}px`,
                width: `${width}px`
            }}
        >
            <div className='record-edit-navigation noselect'
                ref="record-edit-navigation"
                style={{ height: `${height}px` }}
            >
                {renderNavigation}
            </div>
            <div className='record-edit-content flex-rest' style={{
                minHeight: `${height}px`,
                width: `${width - 230}px`
            }}>
                <div className='edit-content-header flex-start-center noselect'
                    ref="edit-content-header"
                    style={{ width: `${width - 231}px` }}
                >
                    {renderOperate}
                </div>
                <div className='edit-content-input'
                    ref="edit-content-input"
                    style={{ width: `${width - 231}px` }}
                >
                    {renderContent}
                </div>
            </div>
        </div>

    }
}
