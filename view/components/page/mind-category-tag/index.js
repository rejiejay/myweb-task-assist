import loadScript from './../../../utils/loadScript'
import configs from './../../../configs'
import toast from './../../../components/toast'

import essay from './essay'
import administrativeAptitude from './administrative-aptitude'

export class MindCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowEssay: window.localStorage['jeker-civil-servants-helper-system-isShowEssay'] === '1',
        }
    }

    componentDidMount() {
        this.initMind()
    }

    async initMind() {
        const { isShowEssay } = this.state

        if (!window.jsMind) {
            toast.show();
            await loadScript(`${configs.libraryProfixUrl}lib/mind/index.js`)
            toast.destroy();
        }

        this.mindInstan = new jsMind({
            container: 'jsmind_container',
            editable: false,
            theme: 'primary'
        })

        this.mindInstan.show(isShowEssay ? essay : administrativeAptitude);

        this.initSelectHandle();
    }

    initSelectHandle() {
        const self = this

        const selectNodeHandle = node => {
            const data = self.mindInstan.get_node(node)

            this.selectHandle(data.id, data.topic);
        }

        this.mindInstan.add_event_listener((type, { evt, node }) => {
            if (type === 4 && evt === 'select_node') selectNodeHandle(node)
        });
    }

    selectHandle = (id, topic) => {
        const { resolve } = this.props

        const { isShowEssay } = this.state
        const mind = isShowEssay ? essay : administrativeAptitude;
        const data = mind.data;
        let category = [{ id, topic }];
        const findChildren = id => data.filter(({ parentid }) => parentid === id);
        const findChildrenHandle = findArray => {
            let allChildren = [];
            for (let index = 0; index < findArray.length; index++) {
                const { id } = findArray[index];

                const firstChildren = findChildren(id);
                allChildren = allChildren.concat(firstChildren);
                if (firstChildren.length > 0) {
                    const deeperChildren = findChildrenHandle(firstChildren);
                    allChildren = allChildren.concat(deeperChildren);
                }
            }

            return allChildren;
        }
        const allChildren = findChildrenHandle(category);
        category = category.concat(allChildren);

        resolve(category);
    }

    selectAllHandle = () => {
        const { resolve } = this.props
        resolve([]);
    }

    switchCategory = () => {
        const isShowEssay = !this.state.isShowEssay;
        window.localStorage['jeker-civil-servants-helper-system-isShowEssay'] = isShowEssay ? '1' : '0';
        this.setState({ isShowEssay });

        this.refs.jsmind.innerHTML = '';

        this.mindInstan = new jsMind({
            container: 'jsmind_container',
            editable: false,
            theme: 'primary'
        })

        this.mindInstan.show(isShowEssay ? essay : administrativeAptitude);

        this.initSelectHandle();
    }

    render() {
        const { isShowEssay } = this.state

        return <div className='mind-category-tag noselect'>
            <div className='category-switch'
                onClick={this.switchCategory}
            >{isShowEssay ? '申论' : '行测'}</div>
            <div className='category-all'
                onClick={this.selectAllHandle}
            >所有</div>
            <div ref="jsmind" className="record-mind-container" id="jsmind_container" />
        </div>
    }
}