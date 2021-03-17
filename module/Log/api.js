import instantiate from './instantiate.js'

let API = {}

Object.keys(instantiate).forEach(key => {
    const intercept = (...res) => {
        const log = instantiate[key](...res)
        const nowDate = new Date().getDate()
        const fileName = `./output/log/${nowDate}.text`

        fs.readFile(fileName, (err, data) => {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取: " + data.toString());
        });

        fs.writeFile(fileName, log, {}, err => {
            if (err) console.error(err)
        })
    }

    API[key] = intercept
});

export default API