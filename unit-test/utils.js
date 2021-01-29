import consequencer from './../utils/consequencer'

const methodHelper = tester => async () => {
    const testNames = Object.keys(tester)

    for (let index = 0; index < testNames.length; index++) {
        const testName = testNames[index]
        const method = tester[testName]

        let test
        try {
            test = await method()
        } catch (error) {
            return console.error(`${testName} test error: `, error)
        }
        if (test.result !== 1) return console.error(`${testName} test error: `, test.message)
        console.log(`${testName} result: ${test.message}`)
    }
}

const resolveHandle = (method, { isShowResult } = { isShowResult: false }) => () => new Promise((resolve, reject) => {
    const json = data => {
        if (!!isShowResult) console.log(data)
        resolve(data)
    }
    const success = (data, message = '') => {
        if (!!isShowResult) console.log(data)
        resolve(consequencer.success(data, message))
    }
    const failure = (message, result = '2333', data = null) => reject(consequencer.error(message, result, data))
    const responseHanle = { json, success, failure }

    try {
        method(responseHanle)
    } catch (error) {
        reject(consequencer.error(`${error}`))
    }
}).catch(error => consequencer.error(`${error}`))

const utils = {
    methodHelper,
    resolveHandle
}

export default utils

