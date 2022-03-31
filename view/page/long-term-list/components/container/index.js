export default class Container extends React.Component {
    constructor(props) {
        super(props)
        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        // const clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
        this.minHeight = `${clientHeight - 40}px`;
        this.minContainerHeight = `${clientHeight - 91}px`;
    }

    render() {
        const { minHeight, minContainerHeight } = this
        const { HeaderComponent, ListComponent, PreviewComponent } = this.props

        return <>
            <div className="long-term-list flex-start" style={{ minHeight }}>

                <div className="main-windows flex-column flex-rest"
                    style={{ minHeight }}
                >
                    {HeaderComponent}

                    <div className="main-windows-list flex-column-center flex-rest noselect"
                        style={{ minHeight: minContainerHeight }}
                    >
                        {ListComponent}
                    </div>
                </div>

                <div className="main-windows-preview flex-column"
                    style={{ minHeight }}
                >
                    {PreviewComponent}
                </div>
            </div>

            <div className="copyright">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
        </>
    }
}
