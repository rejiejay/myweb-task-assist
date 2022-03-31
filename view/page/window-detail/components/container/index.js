export default class Container extends React.Component {
    constructor(props) {
        super(props)

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
    }

    render() {
        const {
            MainComponent,
            SmartComponent,
            isShowSmart,
            OperationalComponent,
        } = this.props
        const {
            clientHeight
        } = this

        return <div className="windows-container flex-start"
            style={{ height: `${clientHeight}px` }}
        >
            <div className='windows-main flex-rest flex-column'
                style={{ height: `${clientHeight}px` }}
            >
                {MainComponent}
            </div>
            {!!isShowSmart &&
                <div className='windows-smart flex-rest'
                    style={{ height: `${clientHeight}px` }}
                >
                    {SmartComponent}
                </div>
            }
            <div className="windows-operational"
                style={{ height: `${clientHeight}px` }}
            >
                {OperationalComponent}
            </div>
        </div>
    }
}
