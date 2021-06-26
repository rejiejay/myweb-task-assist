import { AddIcon } from './svg';

export default class ProjectPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className='project-plan noselect'>
            <div className='project-plan-container flex-start'>
                <div className='project-plan-main'>
                    <label>整体目标</label>
                    <AddIcon size='12' />
                </div>
            </div>
        </div>
    }
}
