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

    render() {
        const { links } = this.state

        return <div className='navigation-link'>link</div>
    }
}

export default NavigationLink
