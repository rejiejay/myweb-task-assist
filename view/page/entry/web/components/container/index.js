export default class Container extends React.Component {
    constructor(props) {
        super(props)
        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.minHeight = `${clientHeight - 40}px`;
        this.minContainerHeight = `${clientHeight - 91}px`;
    }

    render() {
        const { minHeight, minContainerHeight } = this
        const { HeaderComponent, ClassificationComponent, ListComponent, PreviewComponent } = this.props

        return <>
            <div className="short-term-unclassified flex-start" style={{ height: minHeight }}>

                <div className="main-windows flex-column flex-rest"
                    style={{ height: minHeight }}
                >
                    {HeaderComponent}

                    <div className="main-windows-container flex-start flex-rest"
                        style={{ height: minContainerHeight }}
                    >

                        <div className="main-windows-classification"
                            style={{ height: minContainerHeight }}
                        >
                            {ClassificationComponent}
                        </div>

                        <div className="main-windows-list flex-column-center flex-rest noselect"
                            style={{ height: minContainerHeight }}
                        >
                            {ListComponent}
                        </div>
                    </div>
                </div>

                <div className="main-windows-preview flex-column"
                    style={{ height: minHeight }}
                >
                    {PreviewComponent}
                </div>
            </div>

            <div className="copyright">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
        </>
    }
}
