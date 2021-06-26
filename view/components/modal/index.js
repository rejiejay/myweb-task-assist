import style from './style.js'

class Modal {
    constructor(Element, props = {}, className = '', zIndex = 99) {
        this.div = document.createElement('div');
        this.div.setAttribute('style', style.content(zIndex))
        this.div.className = `components-modal flex-center ${className}`;
        this.renderElement = (resolve, reject) => <Element
            resolve={resolve}
            reject={reject}
            {...props}
        />
    }

    destroy = () => {
        document.body.removeChild(this.div);
    }

    show() {
        const div = this.div
        const renderElement = this.renderElement
        const destroy = this.destroy

        return new Promise((resolve, reject) => {
            const resolveHandle = result => {
                resolve(result)
                destroy()
            }
            const rejectHandle = message => {
                reject(new Error(message))
                destroy()
            }
            document.body.appendChild(div)
            ReactDOM.render(renderElement(resolveHandle, rejectHandle), div);
        })
            .catch(error => error);
    }
}

export default Modal
