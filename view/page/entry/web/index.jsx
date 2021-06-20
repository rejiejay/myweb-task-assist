import Container from './components/container';
import Operation from './components/operation';
import Header from './components/header';
import List from './components/list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <Container
            OperationComponent={Operation}
        >
            <Header />
            <List />
        </Container>
    }
}
