class MainComponent extends React.Component {
    render() {
        return (<div class="todo-assist-list flex-column-center">
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../conclusion/edit/index.html'}
                >新增结论?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../why/edit/index.html'}
                >新增理由?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../plan/edit/index.html'}
                >新增计划?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../plan/according-edit/index.html'}
                >新增计划依据?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../target/json-config/index.html'}
                >新增目标?</div>
            </div>
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
