const optionalHeaders = () => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
    headers.append('task-assist-v4-token', localStorage.getItem('task-assist-v4-token'))

    return headers
}

export default optionalHeaders
