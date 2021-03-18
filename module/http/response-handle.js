import consequencer from './../../utils/consequencer.js'
import Log from './../Log'

class ResponseHandle {
    constructor(response) {
        this.response = response
    }

    responseJsonHandle(data) {
        let writeContent = JSON.stringify(data)
        this.response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        this.response.end(`${writeContent}`)

        if (writeContent.length > 400) writeContent = `${writeContent.substr(0, 400)}......`
        Log.success(`response: ${writeContent}\nresponse end ------------------>`)
    }

    json(data) {
        return this.responseJsonHandle(data)
    }

    success(data, message = '') {
        return this.responseJsonHandle(consequencer.success(data, message))
    }

    failure(message, result = '2333', data = null) {
        return this.responseJsonHandle(consequencer.error(message, result, data))
    }
}

export default ResponseHandle