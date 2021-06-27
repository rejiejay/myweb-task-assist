import consequencer from './../../../utils/consequencer'
import toast from './../toast/index.js'

const fetchHandle = (url, optional) => new Promise((resolve, reject) => {
    toast.show()

    window.fetch(url, optional)
        .then(response => response.json())
        .then(data => {
            toast.destroy()
            resolve(consequencer.success(data))
        })
        .catch(error => {
            toast.destroy()
            reject(consequencer.error(`${error}`))
        })
}).catch(error => error);

export default fetchHandle
