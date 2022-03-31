const methodHelper = tester => async () => {
    const testNames = Object.keys(tester)

    for (let index = 0; index < testNames.length; index++) {
        const testName = testNames[index]
        const method = tester[testName]

        let test
        try {
            test = await method()
        } catch (error) {
            return console.error(`catch ${testName} error: `, error.message)
        }

        if (test instanceof Error) {
            console.error(`${testName} error: `);
            return console.error(test);
        }

        console.log(`------------------------------------------------------- ${testName}: ${test.message || 'good~'}`)
    }
}

const resolveHandle = (method, { isShowResult } = { isShowResult: false }) => () => new Promise((resolve, reject) => {
    const json = data => {
        if (!!isShowResult) console.log(data)
        if (data.result !== 1) return reject(new Error(data.message))
        resolve(data)
    }

    const success = (data, message = 'success') => {
        if (!!isShowResult) console.log(data)
        resolve(data)
    }

    const failure = (message = 'failure', result = '2333', data = null) => {
        if (!!isShowResult) console.log(data)
        reject(new Error(message))
    }

    const responseHanle = { json, success, failure }

    try {
        method(responseHanle)
    } catch (error) {
        console.error('method(responseHanle) catch error');
        console.error(error);
        reject(error)
    }
}).catch(error => error)

const authRequest = {
    method: 'POST'
}

const utils = {
    methodHelper,
    resolveHandle,
    authRequest
}

export default utils

