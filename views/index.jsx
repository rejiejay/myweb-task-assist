import login from './../components/login.js';
import { ProcessTask } from './../components/process-task/index.jsx';

class MainComponent extends React.Component {

    componentDidMount() {
        login()
    }

    navigate = href => window.location.href = href

    render() {
        return [
            <ProcessTask></ProcessTask>,
            <div className="todo-assist-list flex-column-center">
                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./todo/index.html')}
                    >我要做什么?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=howTodo')}
                    >不想做?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=needTodo')}
                    >有哪些可以做?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=plan')}
                    >计划是什么?进度到哪?何时能完成?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=review')}
                    >有哪些可以复习?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=addTodo')}
                    >创建新任务?</div>
                </div>

                <div className="button-container">
                    <div className="button noselect"
                        onClick={() => this.navigate('./target/index.html?redirect=addOther')}
                    >新的灵感?</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
