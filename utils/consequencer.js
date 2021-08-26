const consequencer = {
    success: (data = null, message = 'success', result = 1) => ({
        result: +result,
        data: data,
        message: message
    }),
    error: (message, result = 9, data = null) => ({
        result: +result,
        data: data,
        message: message
    })
}

export default consequencer