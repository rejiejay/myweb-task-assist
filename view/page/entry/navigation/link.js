import service from './../service'

const props = {
    resolve: () => { },
    reject: () => { }
}

export class NavigationLink extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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

    async componentDidMount() {
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

    renderLink = link => {
        const { topic, isHideChildren, uniquelyIdentify } = link
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

        return <div className='link-item'>
            <div className='link-item-container flex-start-center'>

                <div className='flex-rest'>{topic}</div>

                {children.length > 0 && <div
                    onClick={() => this.switchLinkElementHiden(uniquelyIdentify)}
                >
                    {isHideChildren ? <BlowUp /> : <Minify />}
                </div>}

            </div>

            {children.length > 0 && !isHideChildren && <div className='link-item-children'>{children}</div>}
        </div>
    }

    render() {
        const { links } = this.state
        const linkElements = []

        links.forEach(link => linkElements.push(this.renderLink(link)))

        return <div className='navigation-link'>
            <div className='navigation-link-elements'>{linkElements}</div>
        </div>
    }
}

export default NavigationLink
