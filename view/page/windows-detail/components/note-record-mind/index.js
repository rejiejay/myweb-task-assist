import toast from './../../../../components/toast'
import loadScript from './../../../../utils/loadScript'
import configs from './../../../../configs'

import mockData from './mock-data'


export default class NoteRecordMind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.initMind()
    }

    async initMind() {
        if (!window.jsMind) {
            toast.show();
            await loadScript(`${configs.libraryProfixUrl}lib/mind/index.js`)
            toast.destroy();
        }

        const mindData = {
            meta: { name: "jsMind", author: "hizzgdev@163.com", version: "0.4.6" },
            format: "node_array",
            data: mockData
        }
        const mindInstan = new jsMind({
            container: 'jsmind_container',
            editable: true,
            theme: 'primary'
        })
        mindInstan.show(mindData);
    }

    render() {
        const { height, width } = this.props;

        return <div className='note-record-mind noselect' style={{ height: `${height}px` }}>
            <div className="operation">
                <div className="operation-container flex-start">
                    <div className="operation-item">
                        <div className="operation-item-container flex-center">新增</div>
                    </div>
                </div>
            </div>

            <div className="record-mind-container"
                id="jsmind_container"
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                }}
            />
        </div>
    }
}
