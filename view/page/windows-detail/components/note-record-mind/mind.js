import toast from './../../../../components/toast'
import loadScript from './../../../../utils/loadScript'
import configs from './../../../../configs'
import service from './../../../../service'

export class Mind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    async initMind(taskId) {
        if (!window.jsMind) {
            toast.show();
            await loadScript(`${configs.libraryProfixUrl}lib/mind/index.js`)
            toast.destroy();
        }

        const fetchInstance = await service.notes.getNotesMindByTask(taskId);
        if (fetchInstance.result !== 1) return
        const notes = fetchInstance.data.map(({ id, parentid, title }) => ({
            id,
            parentid,
            topic: title,
            direction: 'right'
        }))
        const mind = [
            {
                id: taskId,
                isroot: true,
                topic: "任务笔记"
            },
            ...notes
        ];

        const mindData = {
            meta: { name: "jsMind", author: "hizzgdev@163.com", version: "0.4.6" },
            format: "node_array",
            data: mind
        }
        this.mindInstan = new jsMind({
            container: 'jsmind_container',
            editable: false,
            theme: 'primary'
        })
        this.mindInstan.show(mindData);

        this.initSelectHandle();
    }

    initSelectHandle() {
        const { selectHandle } = this.props;
        const self = this

        const selectNodeHandle = node => {
            const data = self.mindInstan.get_node(node)

            selectHandle && selectHandle(data.id);
        }

        this.mindInstan.add_event_listener((type, { evt, node }) => {
            if (type === 4 && evt === 'select_node') selectNodeHandle(node)
        });
    }

    render() {
        const { height, width } = this.props;

        return <div className="record-mind-container"
            id="jsmind_container"
            style={{
                height: `${height}px`,
                width: `${width}px`,
            }}
        />
    }
}
